import { Telegraf } from "telegraf"
import * as uuid from "uuid"
import CommunityContainedInput from "./assets/CommunityContainedInput"

const TOKEN = process.env.TELEGRAM_TOKEN;

const bot = new Telegraf(TOKEN, { username: "KotKitBot" });
bot.on("inline_query", async ({ inlineQuery, answerInlineQuery }) => {
    if (inlineQuery.query) {
        console.log(`Caller: ${inlineQuery.from.username} (${inlineQuery.from.is_bot ? "bot" : "human"}), Input: ${inlineQuery.query}`);
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