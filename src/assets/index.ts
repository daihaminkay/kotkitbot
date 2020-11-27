import CommunityContainedInput from "./CommunityContainedInput"
import EmoInput from "./EmoInput";
import { IInput } from "./IInput"

const languages: { [key: string]: IInput } = {
    "fakeranian": new CommunityContainedInput(),
    "2007": new EmoInput()
}

export { languages }