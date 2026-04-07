export type Level = {
    id: number;
    title: string;
    text: string;
    difficulty: 'easy' | 'medium' | 'hard';
};

export const levels_data: Level[] = [
    {
        id: 1,
        title: 'Hello World',
        text: 'hello world',
        difficulty: 'easy',
    },
    {
        id: 2,
        title: 'Short Sentence',
        text: 'The quick brown fox jumps over the lazy dog',
        difficulty: 'easy',
    },
    {
        id: 3,
        title: 'Pangram',
        text: 'Pack my box with five dozen liquor jugs',
        difficulty: 'medium',
    },
    {
        id: 4,
        title: 'Programming',
        text: 'const hello = () => console.log("Hello, World!");',
        difficulty: 'medium',
    },
    {
        id: 5,
        title: 'Speed Test',
        text: 'The only way to do great work is to love what you do and never stop learning',
        difficulty: 'hard',
    },
];
