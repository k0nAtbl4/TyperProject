
import { useState } from 'react';
import './HomePage.css';
import { TextWriter } from '../../components/GameComponent/TextWriter';
import { levels_data } from '../../levels_data';

const HomePage = () => {
    const [showWriter, setShowWriter] = useState(false);
    const [randomText, setRandomText] = useState('');

    const playRandom = () => {
        const randomLevel = levels_data[Math.floor(Math.random() * levels_data.length)];
        setRandomText(randomLevel.text);
        setShowWriter(true);
    };

    return (
        <div className="main-container">
            {!showWriter ? (
                <>
                    <div className="homepage-info">
                        <h1 className="homepage-title">Welcome to TypeFlow</h1>
                        <p className="homepage-description">
                            TypeFlow is a typing trainer that helps you improve your speed and accuracy.
                        </p>

                        <div className="homepage-instructions">
                            <h2>How to play:</h2>
                            <ul>
                                <li>Select a level from the <strong>Levels</strong> page</li>
                                <li>Type the text shown on the screen using your <strong>English keyboard</strong></li>
                                <li>Green characters = correct, Red = incorrect</li>
                                <li>Use <strong>Backspace</strong> to delete mistakes</li>
                                <li>Use <strong>Shift</strong> for capital letters</li>
                            </ul>
                        </div>

                        <button className="homepage-button" onClick={playRandom}>
                            Try Random Text
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <button className="homepage-back-button" onClick={() => setShowWriter(false)}>
                        Back
                    </button>
                    <TextWriter text={randomText} />
                </>
            )}
        </div>
    )
}

export default HomePage;
