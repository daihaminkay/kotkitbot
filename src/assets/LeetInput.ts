import { IInput } from './IInput';

export default class LeetInput implements IInput {

    private static lookup: Record<string, string> = {
        a: '4',
        e: '3',
        g: '6',
        i: '1',
        o: '0',
        s: '5',
        t: '7'
    }
    
    public processMessage(message: string): string {
        let emoMessage = "";
        for (const letter of message) {
            const lower = letter.toLocaleLowerCase();
            emoMessage += LeetInput.lookup?.[lower] ?? lower;
        }
        return emoMessage;
    }
    
    public getDescription(): string {
        return 'm4k35 y0u2 73x7 100k 11k3 7h15.';
    }
    
    public getThumbnailUrl?(): string {
        return 'https://lh3.googleusercontent.com/proxy/2zz2eHImhqyePfgOCNVmH9UPqaGktuCKgwzb0L9PcA-jzoB-STitf4nWEOiVvzv7szlN5JLQp6dmSzVAmw3xmGWiKGN0ZKNRzc5xMt6TmmhvsvOI';
    }
}