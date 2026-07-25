import { useState, useEffect, useRef } from 'react';
import './TextWriter.css';
import { useStatistics } from '../../context/StatisticsContext';
import { useCompletedLevels } from '../../context/CompletedLevelsContext';
import { api } from '../../api/api';

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
    const [accuracy, setAccuracy] = useState(0);
    const startTimeRef = useRef<number | null>(null);
    const winHandledRef = useRef(false);
    const ref = useRef<HTMLDivElement>(null);
    const { addStat, stats } = useStatistics();
    const { markCompleted } = useCompletedLevels();

    const calculateWpm = (chars: number, timeMs: number) => {
        const minutes = timeMs / 60000;
        const words = chars / 5;
        return Math.round(words / minutes);
    };

    const calculateAccuracy = (input: string[], text: string) => {
        let correct = 0;
        for (let i = 0; i < input.length; i++) {
            if (input[i] === text[i]) {
                correct++;
            }
        }
        return Math.round((correct / input.length) * 100);
    };

    const handleWin = () => {
        if (winHandledRef.current) return;
        winHandledRef.current = true;

        if (startTimeRef.current) {
            const elapsed = Date.now() - startTimeRef.current;
            const wpmResult = calculateWpm(props.text.length, elapsed);
            const accuracyResult = calculateAccuracy(currentInput, props.text);
            setWpm(wpmResult);
            setAccuracy(accuracyResult);
            addStat(wpmResult, accuracyResult);
            if (props.level !== undefined) {
                markCompleted(props.level);
                api.saveGame({
                    task_id: props.level,
                    user_id: 1,
                    wpm: wpmResult,
                    accuracy: accuracyResult,
                    time: elapsed,
                    game_time: elapsed,
                }).catch(console.error);
            }
            setIsFinished(true);
        }
    };

    useEffect(() => {
        winHandledRef.current = false;
    }, [props.text]);

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
                        const isCorrect = newInput.every((c, i) => {
                            const inputChar = c === '_' ? ' ' : c;
                            return inputChar === props.text[i];
                        });
                        if (isCorrect) {
                            setTimeout(handleWin, 0);
                        }
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
    }, [isFinished, currentInput, props.text]);

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

    const previousStat = stats.length > 1 ? stats[1] : null;
    const wpmDiff = previousStat ? wpm - previousStat.wpm : null;
    const accDiff = previousStat ? accuracy - previousStat.accuracy : null;

    return (
        <div className="key-display" ref={ref}>
            <span className="key-display__text">
                {renderResult()}
            </span>
            {wrongLanguage && <h1 className="wrong-language">Wrong language!</h1>}
            {isFinished && (
                <div className="win-screen">
                    <h2 className="win-title">Finished!</h2>
                    <div className="win-stats">
                        <div className="win-stat">
                            <span className={`win-stat-value ${wpmDiff !== null ? (wpmDiff > 0 ? 'up' : wpmDiff < 0 ? 'down' : '') : ''}`}>
                                {wpm}
                            </span>
                            <span className="win-stat-label">WPM</span>
                            {wpmDiff !== null && wpmDiff !== 0 && (
                                <span className={`win-diff ${wpmDiff > 0 ? 'up' : 'down'}`}>
                                    {wpmDiff > 0 ? '↑' : '↓'}
                                </span>
                            )}
                        </div>
                        <div className="win-stat">
                            <span className={`win-stat-value ${accDiff !== null ? (accDiff > 0 ? 'up' : accDiff < 0 ? 'down' : '') : ''}`}>
                                {accuracy}%
                            </span>
                            <span className="win-stat-label">Accuracy</span>
                            {accDiff !== null && accDiff !== 0 && (
                                <span className={`win-diff ${accDiff > 0 ? 'up' : 'down'}`}>
                                    {accDiff > 0 ? '↑' : '↓'}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}