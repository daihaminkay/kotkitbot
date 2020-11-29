import { Telegraf, Markup } from "telegraf";
import { DataRetainer } from "./storage/DataRetainer";
import * as uuid from "uuid";
import { languages } from "./assets";
import { InlineQueryResultArticle, User } from "telegraf/typings/telegram-types";

const TOKEN = process.env.TELEGRAM_TOKEN;
const DATABASE_URL = process.env.DATABASE_URL;
const ADMIN_ID = process.env.ADMIN_ID;
const DEFAULT_LANGUAGE = "fakeranian";
const SEED = uuid.v4();

const bot = new Telegraf(TOKEN, { username: "KotKitBot" });
const dr = new DataRetainer(DATABASE_URL);

async function registerActivity({ from, query }: { from: User, query?: string }) {
    const userId = from.id.toString();
    const userHandle = from.username || from.first_name;
    const userRole = from.is_bot ? "bot" : "human";
    console.log(`Caller: ${userHandle} (${userRole}), Input: ${query ?? "nil"}`);
    await dr.addUsageRecord(userId, userHandle, userRole);
}

bot.on("inline_query", async ({ from, inlineQuery, answerInlineQuery }) => {
    if (inlineQuery.query) {
        registerActivity(inlineQuery);
        const language = await dr.getUserLanguageMapping(from.id.toString());
        const processor = languages[language || DEFAULT_LANGUAGE];
        const message = processor.processMessage(inlineQuery.query);
        const response: InlineQueryResultArticle[] = [{
            type: "article",
            id: uuid.v4(),
            title: message,
            thumb_url: processor.getThumbnailUrl?.(),
            description: language,
            input_message_content: {
                message_text: message
            }
        }];
        return answerInlineQuery(response);
    }
});

bot.command("stats", async ({ from, replyWithHTML }) => {
    if (from.id.toString() === ADMIN_ID) {
        const stats = await dr.getUsageStatistics();
        let statsResponse = "";
        for (const datum of stats) {
            statsResponse += `<code>${datum.user_handle}</code> (${datum.role}) - <b>${datum.call_count}</b>\n`;
        }

        replyWithHTML(statsResponse);
    }
});

bot.command("listLanguages", async ({ from, replyWithHTML }) => {
    registerActivity({ from });
    let languageList = "";
    for (const language in languages) {
        languageList += `[<code>${language}</code>] - ${languages[language].getDescription()}\n`;
    }

    replyWithHTML(languageList);
});

bot.command("chooseLanguage", async ({ from, reply }) => {
    registerActivity({ from });
    const languageMarkup = Markup.inlineKeyboard(Object.keys(languages).map(language => Markup.callbackButton(language, language + SEED)));
    reply("Choose your language pack:", { reply_markup: languageMarkup });
});

bot.help(async ({ from, reply }) => {
    registerActivity({ from });
    const menuMarkup = Markup.keyboard([Markup.button("/listLanguages"), Markup.button("/chooseLanguage"), Markup.button("Usage")]);
    reply("Choose what you want to do:", { reply_markup: menuMarkup });
});

bot.hears("Usage", ({ from, reply }) => {
    registerActivity({ from });
    reply("Simply go to the chat you want to use me in and type \"@KotKitBot\" and a space. " +
        "Then, type in your message, and I will show you my \"translation\" according to " +
        "the language you picked! Select the translation, and it will be sent to whoever " +
        "you are chatting with.");
});

for (const language in languages) {
    bot.action(language + SEED, async ({ from, replyWithHTML }) => {
        registerActivity({ from });
        await dr.setUserLanguageMapping(from.id.toString(), language);
        replyWithHTML(`Here you go, <b>${language}</b> was successfully selected! You can start using the bot now.`);
    });
}

dr.initialize().then(() => {
    bot.launch();
    console.log("Bot running!");
});