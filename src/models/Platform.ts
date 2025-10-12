export type TextPart = {
    text: string;
    color: string;
};

export type Platform = {
    name: string;
    connected: boolean;
    textParts: TextPart[];
};
