import { useState, useEffect, useRef } from 'react';
import './TextWriter.css';

type TextWriterProps = {
    text: string
    level?: number
}

export function TextWriter(props: TextWriterProps) {
    const [pressedKey, setPressedKey] = useState<string | null>(null);
    const [currentInput, setCurrentInput] = useState<string[]>([]);
    const [wrongLanguage, setWrongLanguage] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [wpm, setWpm] = useState(0);
    const startTimeRef = useRef<number | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    const calculateWpm = (chars: number, timeMs: number) => {
        const minutes = timeMs / 60000;
        const words = chars / 5;
        return Math.round(words / minutes);
    };

    const handleWin = () => {
        if (startTimeRef.current) {
            const elapsed = Date.now() - startTimeRef.current;
            const result = calculateWpm(props.text.length, elapsed);
            setWpm(result);
            setIsFinished(true);
        }
    };

    useEffect(() => {
        let shiftHeld = false;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (isFinished) return;

            setPressedKey(e.key);

            if (e.key === 'Shift') {
                shiftHeld = true;
                return;
            }

            if (e.key === 'Backspace') {
                setCurrentInput(prev => prev.slice(0, -1));
                return;
            }
            if (e.key === ' ') {
                setCurrentInput(prev => [...prev, '_']);
                return;
            }
            if (/^[a-zA-Z]$/.test(e.key)) {
                setWrongLanguage(false);
                const char = shiftHeld ? e.key.toUpperCase() : e.key;
                setCurrentInput(prev => {
                    const newInput = [...prev, char];
                    if (newInput.length === 1) {
                        startTimeRef.current = Date.now();
                    }
                    if (newInput.length === props.text.length) {
                        setTimeout(handleWin, 0);
                    }
                    return newInput;
                });
                shiftHeld = false;
            } else if (e.key.length === 1 && !/^[a-zA-Z]$/.test(e.key)) {
                setWrongLanguage(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isFinished]);

    const renderResult = () => {
        const result = [];
        for (let i = 0; i < props.text.length; i++) {
            if (typeof currentInput[i] !== "undefined") {
                if (currentInput[i] !== '_' && props.text[i] === ' ') {
                    result.push(<span key={i} className="red-char">{'_'}</span>);
                } else {
                    result.push(<span key={i} className={currentInput[i] === props.text[i] ? "green-char" : "red-char"}>{props.text[i]}</span>);
                }
            } else {
                result.push(<span key={i} className={"gray-char"}>{props.text[i]}</span>);
            }
        }
        return result;
    }

    return (
        <div className="key-display" ref={ref}>
            <span className="key-display__text">
                {renderResult()}
            </span>
            {wrongLanguage && <h1 className="wrong-language">Wrong language!</h1>}
            {isFinished && (
                <div className="win-screen">
                    <h2 className="win-title">Finished!</h2>
                    <p className="win-wpm">{wpm} WPM</p>
                </div>
            )}
        </div>
    );
}