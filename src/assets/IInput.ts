export interface IInput {
    processMessage(message: string): string;
    getDescription(): string;
}