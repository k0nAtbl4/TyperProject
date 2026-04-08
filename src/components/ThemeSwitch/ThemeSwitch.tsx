// SwitchThemeButton.tsx
import React from 'react';
import './ThemeSwitch.css';
import { useTheme } from '../../context/ThemeContext';

const SwitchThemeButton: React.FC = () => {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else if (theme === 'dark') {
            setTheme('system');
        } else {
            setTheme('light');
        }
    };

    const getIcon = () => {
        if (theme === 'light') return '☀️';
        if (theme === 'dark') return '🌙';
        return '💻';
    };

    return (
        <button
            className={`theme-switch ${theme}`}
            onClick={toggleTheme}
            aria-label="Switch theme"
        >
            <div className="slider">
                <div className="icon">
                    {getIcon()}
                </div>
            </div>
        </button>
    );
};

export default SwitchThemeButton;