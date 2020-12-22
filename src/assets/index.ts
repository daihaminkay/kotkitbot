import FakeranianInput from "./FakeranianInput";
import EmoInput from "./EmoInput";
import LeetInput from "./LeetInput";
import { IInput } from "./IInput";
import RussianEmoInput from "./RussianEmoInput";
import SwearInput from "./SwearInput";

const languages: Record<string, IInput> = {
    "fakeranian": new FakeranianInput(),
    "2007": new EmoInput(),
    "чмаффки": new RussianEmoInput(),
    "l33t": new LeetInput(),
    "епты": new SwearInput(),
};

export { languages };