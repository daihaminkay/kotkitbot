import { Telegraf, Markup } from "telegraf";
import { DataRetainer } from "./storage/DataRetainer";
import * as uuid from "uuid";
import { languages } from "./assets";
import { InlineKeyboardMarkup, InlineQueryResultArticle, User } from "telegraf/typings/telegram-types";
import { IInput } from "./assets/IInput";
import { CallbackButton } from "telegraf/typings/markup";

const TOKEN = process.env.TELEGRAM_TOKEN;
const DATABASE_URL = process.env.DATABASE_URL;
const ADMIN_ID = process.env.ADMIN_ID;
const DEFAULT_LANGUAGE = "fakeranian";
const SEED = uuid.v4();

if (!TOKEN || !DATABASE_URL) {
    console.error("Telegram token or database URL has not been provided");
    process.exit(-1);
}

const bot = new Telegraf(TOKEN, { username: "KotKitBot" });
const dr = new DataRetainer(DATABASE_URL);

async function registerActivity({ from, query }: { from?: User, query?: string }) {
    if (!from) {
        console.warn("Usage was anonymous, nothing to record");
        return;
    }
    const userId = from.id.toString();
    const userHandle = from.username || from.first_name;
    const userRole = from.is_bot ? "bot" : "human";
    console.log(`Caller: ${userHandle} (${userRole}), Input: ${query ?? "nil"}`);
    try {
        await dr.addUsageRecord(userId, userHandle, userRole);
    } catch (e) {
        console.log(`Failed to add usage record: ${e}`);
    }
}

function createKeyboard(languages: Record<string, IInput>): InlineKeyboardMarkup {
    // using .reduce to put buttons in rows of 3, so that the content name isn't swallowed
    const buttonRows = Object.keys(languages).reduce<CallbackButton[][]>((memo, value, index) => {
        if (index >= 3 && index !== 0) memo.push([]);
        memo[memo.length - 1].push(Markup.callbackButton(value, value + SEED));
        return memo;
    }, [[]]);
    return Markup.inlineKeyboard(buttonRows);
}

bot.on("inline_query", async ({ from, inlineQuery, answerInlineQuery }) => {
    if (inlineQuery?.query) {
        registerActivity(inlineQuery);
        try {
            const language = from ? await dr.getUserLanguageMapping(from.id.toString()) : DEFAULT_LANGUAGE;
            const processor = languages[language];
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
            return answerInlineQuery(response, { cache_time: 0 });
        } catch (e) {
            console.log(`Failed to get language mapping: ${e}`);
        }
    }
});

bot.command("stats", async ({ from, replyWithHTML }) => {
    if (from?.id.toString() === ADMIN_ID) {
        try {
            const stats = await dr.getUsageStatistics();
            let statsResponse = "";
            for (const datum of stats) {
                statsResponse += `<code>${datum.user_handle}</code> (${datum.role}) - <b>${datum.call_count}</b>\n`;
            }

            replyWithHTML(statsResponse);
        } catch (e) {
            console.log(`Failed to get statistics: ${e}`);
        }
    }
});

bot.hears("List options", async ({ from, replyWithHTML }) => {
    registerActivity({ from });
    let languageList = "";
    for (const language in languages) {
        languageList += `[<code>${language}</code>] - ${languages[language].getDescription()}\n`;
    }

    replyWithHTML(languageList);
});

bot.hears("Pick language", async ({ from, reply }) => {
    registerActivity({ from });
    const languageMarkup = createKeyboard(languages);
    reply("Choose your language pack:", { reply_markup: languageMarkup });
});

bot.help(async ({ from, reply }) => {
    registerActivity({ from });
    const menuMarkup = Markup.keyboard([
        Markup.button("List options"),
        Markup.button("Pick language"),
        Markup.button("Usage")
    ]);
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
        if (!from) {
            console.warn("Anonymous attempt to set a language");
            replyWithHTML("You are not authenticated, cannot set a language");
            return;
        }

        registerActivity({ from });
        try {
            await dr.setUserLanguageMapping(from.id.toString(), language);
            replyWithHTML(`Here you go, <b>${language}</b> was successfully selected! You can start using the bot now.`);
        } catch (e) {
            console.log(`Failed to set language mapping: ${e}`);
            replyWithHTML("Sorry, something went wrong. Try again after some time.");
        }
    });
}

dr.initialize().then(() => {
    bot.launch();
    console.log("Bot running!");
});