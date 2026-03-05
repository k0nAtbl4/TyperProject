// themeContext.jsx или ThemeContext.js
import React, { createContext, useState, useContext, use } from 'react';

// Создаем контекст
const SelectedTabContext = createContext<[string, React.Dispatch<React.SetStateAction<string>>] | undefined>(undefined);


// Провайдер контекста
export const SelectedTabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedTab, setSelectedTab] = useState('Home');

    const value: [string, React.Dispatch<React.SetStateAction<string>>] = [selectedTab, setSelectedTab];
    return (
        <SelectedTabContext.Provider value={value}>
            {children}
        </SelectedTabContext.Provider>
    );
};

export const useSelectedTabProvider = () => {
    const context = useContext(SelectedTabContext);
    if (context === undefined) {
        
        throw new Error('useSelectedTabContext must be used within a ThemeProvider');
    }
    return context;
};