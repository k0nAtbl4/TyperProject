import { createContext, useContext, useState, useEffect } from 'react';

type CompletedLevelsContextType = {
    completedLevels: Set<number>;
    markCompleted: (levelId: number) => void;
    isCompleted: (levelId: number) => boolean;
};

const CompletedLevelsContext = createContext<CompletedLevelsContextType | undefined>(undefined);

const STORAGE_KEY = 'typeflow_completed_levels';

export const CompletedLevelsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            setCompletedLevels(new Set(JSON.parse(saved)));
        }
    }, []);

    const markCompleted = (levelId: number) => {
        setCompletedLevels(prev => {
            const updated = new Set(prev);
            updated.add(levelId);
            localStorage.setItem(STORAGE_KEY, JSON.stringify([...updated]));
            return updated;
        });
    };

    const isCompleted = (levelId: number) => completedLevels.has(levelId);

    return (
        <CompletedLevelsContext.Provider value={{ completedLevels, markCompleted, isCompleted }}>
            {children}
        </CompletedLevelsContext.Provider>
    );
};

export const useCompletedLevels = () => {
    const context = useContext(CompletedLevelsContext);
    if (!context) {
        throw new Error('useCompletedLevels must be used within CompletedLevelsProvider');
    }
    return context;
};