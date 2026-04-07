import './AboutPage.css';
import { FaKeyboard, FaRocket, FaTachometerAlt } from 'react-icons/fa';

const AboutPage = () => {
    return (
        <div className="about-container">
            <h1 className="about-title">TypeFlow</h1>
            <p className="about-tagline">Your personal typing coach</p>

            <div className="about-cards">
                <div className="about-card">
                    <FaKeyboard className="about-icon" />
                    <h3>Learn</h3>
                    <p>Practice with texts of varying difficulty. Start simple and work your way up.</p>
                </div>
                <div className="about-card">
                    <FaTachometerAlt className="about-icon" />
                    <h3>Track</h3>
                    <p>See your progress in real-time with instant visual feedback on every keystroke.</p>
                </div>
                <div className="about-card">
                    <FaRocket className="about-icon" />
                    <h3>Improve</h3>
                    <p>Build muscle memory and watch your typing speed increase day by day.</p>
                </div>
            </div>

            <div className="about-content">
                <p>
                    TypeFlow is a modern typing trainer built with React and TypeScript.
                    Practice daily to sharpen your skills and achieve your goals.
                </p>
            </div>

            <p className="about-tech">
                Built with React, TypeScript & Vite
            </p>
        </div>
    )
}

export default AboutPage;