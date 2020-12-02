import CommunityContainedInput from "./CommunityContainedInput";
import EmoInput from "./EmoInput";
import LeetInput from "./LeetInput";
import { IInput } from "./IInput";
import RussianEmoInput from "./RussianEmoInput";

const languages: Record<string, IInput> = {
    "fakeranian": new CommunityContainedInput(),
    "2007": new EmoInput(),
    "чмаффки": new RussianEmoInput(),
    "l33t": new LeetInput()
};

export { languages };