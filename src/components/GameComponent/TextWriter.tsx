import { useState, useEffect, useRef } from 'react';
import './TextWriter.css';






type TextWriterProps = {
    text: string
    level?: number
}



export function TextWriter(props: TextWriterProps) {
    const [pressedKey, setPressedKey] = useState<string | null>(null);
    const [isFocus, setIsFocus] = useState(true);
    const [currentInput, setCurrentInput] = useState<string[]>([]);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let shiftHeld = false;

        const handleKeyDown = (e: KeyboardEvent) => {
            setPressedKey(e.key);
            console.log(currentInput.join(''));
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
            if (isFocus && /^[a-zA-Z]$/.test(e.key)) {
                const char = shiftHeld ? e.key.toUpperCase() : e.key;
                setCurrentInput(prev => [...prev, char]);
                shiftHeld = false;
            }
        };

        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsFocus(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
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
        <div className="key-display" ref={ref} onClick={() => setIsFocus(true)}>
            <span className="key-display__text">
                {
                    isFocus ? renderResult() : "Click to focus"
                }
            </span>
            <h1>
                {currentInput.join('')}
            </h1>
        </div>
    );
}
