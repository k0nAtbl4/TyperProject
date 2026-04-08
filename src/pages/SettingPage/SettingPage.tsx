import { FaPalette, FaKeyboard } from 'react-icons/fa';
import SwitchThemeButton from '../../components/ThemeSwitch/ThemeSwitch';
import './SettingPage.css';

const SettingsPage = () => {
    return (
        <div className="settings-container">
            <h1 className="settings-title">Settings</h1>

            <div className="settings-section">
                <div className="settings-card">
                    <div className="settings-card-header">
                        <FaPalette className="settings-card-icon" />
                        <h2>Appearance</h2>
                    </div>
                    <div className="settings-option">
                        <span>Theme</span>
                        <SwitchThemeButton />
                    </div>
                    <div className="settings-option">
                        <span>Accent Color</span>
                        <span className="settings-badge">Coming Soon</span>
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <div className="settings-card">
                    <div className="settings-card-header">
                        <FaKeyboard className="settings-card-icon" />
                        <h2>Typing</h2>
                    </div>
                    <div className="settings-option">
                        <span>Sound Effects</span>
                        <span className="settings-badge">Coming Soon</span>
                    </div>
                    <div className="settings-option">
                        <span>Show Keystrokes</span>
                        <span className="settings-badge">Coming Soon</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsPage;
