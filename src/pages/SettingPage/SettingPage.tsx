import { useState, useEffect } from 'react';
import { FaCog } from 'react-icons/fa';
import './SettingPage.css';

const SettingsPage = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => prev < 100 ? prev + 1 : 0);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="settings-container">
            <div className="settings-card">
                <FaCog className="settings-icon spinning" />
                <h1 className="settings-title">IN PROGRESS</h1>
                <p className="settings-subtitle">Settings page is under development</p>

                <div className="progress-container">
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <span className="progress-text">{progress}%</span>
                </div>

                <p className="settings-hint">Coming soon...</p>
            </div>
        </div>
    )
}

export default SettingsPage;
