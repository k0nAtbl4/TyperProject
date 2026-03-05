// SwitchThemeButton.tsx
import React, { useState } from 'react';
import './ThemeSwitch.css';


interface SwitchThemeButtonProps {
    is_active: boolean
}


const SwitchThemeButton: React.FC<SwitchThemeButtonProps> = ({is_active}) => {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => {
        setIsDark(!isDark);
        document.body.classList.toggle('dark-theme');
    };

    return (
        <button
            className={`theme-switch ${isDark ? 'dark' : 'light'}`}
            onClick={toggleTheme}
            aria-label="Switch theme"
        >
            <div className="slider">
                <div className="icon">
                    {isDark ? '🌙' : '☀️'}
                </div>
            </div>
        </button>
    );
};

export default SwitchThemeButton;