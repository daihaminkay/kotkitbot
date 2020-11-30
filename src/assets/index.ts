import CommunityContainedInput from "./CommunityContainedInput";
import EmoInput from "./EmoInput";
import LeetInput from "./LeetInput";
import { IInput } from "./IInput";

const languages: { [key: string]: IInput } = {
    "fakeranian": new CommunityContainedInput(),
    "2007": new EmoInput(),
    "l33t": new LeetInput()
};

export { languages };