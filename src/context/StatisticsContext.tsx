import { createContext, useContext, useState, useEffect } from 'react';

export type StatEntry = {
    wpm: number;
    accuracy: number; // percentage of correct characters
    timestamp: number;
};

type StatisticsContextType = {
    stats: StatEntry[];
    addStat: (wpm: number, accuracy: number) => void;
    clearStats: () => void;
    getLastStat: () => StatEntry | null;
};

const StatisticsContext = createContext<StatisticsContextType | undefined>(undefined);

const STORAGE_KEY = 'typeflow_stats';
const MAX_STATS = 20;

export const StatisticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [stats, setStats] = useState<StatEntry[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            setStats(JSON.parse(saved));
        }
    }, []);

    const addStat = (wpm: number, accuracy: number) => {
        const newStat: StatEntry = {
            wpm,
            accuracy,
            timestamp: Date.now(),
        };

        setStats(prev => {
            const updated = [newStat, ...prev].slice(0, MAX_STATS);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });
    };

    const clearStats = () => {
        setStats([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    const getLastStat = () => {
        return stats.length > 0 ? stats[0] : null;
    };

    return (
        <StatisticsContext.Provider value={{ stats, addStat, clearStats, getLastStat }}>
            {children}
        </StatisticsContext.Provider>
    );
};

export const useStatistics = () => {
    const context = useContext(StatisticsContext);
    if (!context) {
        throw new Error('useStatistics must be used within StatisticsProvider');
    }
    return context;
};
