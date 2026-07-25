const BASE_URL = 'http://localhost:8080';

export type Task = {
    id: number;
    text: string;
};

export const api = {
    async getTasks(): Promise<Task[]> {
        const response = await fetch(`${BASE_URL}/tasks`);
        if (!response.ok) throw new Error('Failed to fetch tasks');
        return response.json();
    },

    async getTask(id: number): Promise<Task> {
        const response = await fetch(`${BASE_URL}/tasks/${id}`);
        if (!response.ok) throw new Error('Failed to fetch task');
        return response.json();
    },

    async saveGame(data: {
        task_id: number;
        user_id: number;
        wpm: number;
        accuracy: number;
        time: number;
        game_time: number;
    }): Promise<void> {
        const response = await fetch(`${BASE_URL}/games`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to save game');
    },
};