import { Telegraf } from "telegraf"
import { DataRetainer } from "./statistics"
import * as uuid from "uuid"
import CommunityContainedInput from "./assets/CommunityContainedInput"
import { InlineQuery } from "telegraf/typings/telegram-types";

const TOKEN = process.env.TELEGRAM_TOKEN;
const DATABASE_URL = process.env.DATABASE_URL;
const ADMIN_ID = 211824194;

const bot = new Telegraf(TOKEN, { username: "KotKitBot" });
const dr = new DataRetainer(DATABASE_URL);

bot.on("inline_query", async ({ inlineQuery, answerInlineQuery }) => {
    if (inlineQuery.query) {
        putMetrics(inlineQuery);
        let messageResponse = [processMessage(inlineQuery.query)];
        let response = messageResponse.map(r => ({
            type: "article",
            id: uuid.v4(),
            title: r,
            input_message_content: {
                message_text: r
            }
        }))
        return answerInlineQuery(response)
    }
})

bot.command("stats", async ({ from, replyWithHTML }) => {
    if (from.id === ADMIN_ID) {
        let stats = await dr.getUsageStatistics();
        let statsResponse: string = "";
        for (let datum of stats) {
            statsResponse += `<code>${datum.user_id}</code> (${datum.role}) - <b>${datum.call_count}</b>\n`
        }

        replyWithHTML(statsResponse)
    }
})

bot.launch()

function processMessage(message: string): string {
    const processedMessage = new CommunityContainedInput(message);
    return processedMessage
        .applyZTransformation()
        .applyVowelsTransformation()
        .applyETransformation()
        .applyITransformation()
        .applyDoubleITransformation()
        .applyDoubleLetterTransformation()
        .applyVNaTransformation()
        .applyDoubleConsonantTransformation()
        .applyAbsentLetterTransformation()
        .applyTisyaTransformation()
        .applyInfinitiveTransformation()
        .applyApostropheTransformation()
        .applySingleVowelWordTransformation()
        .toString();
}

async function putMetrics(query: InlineQuery) {
    const clientId = query.from.username || query.from.first_name;
    const clientRole = query.from.is_bot ? "bot" : "human";
    console.log(`Caller: ${clientId} (${clientRole}), Input: ${query.query}`);
    await dr.addUsageRecord(clientId, clientRole)
}