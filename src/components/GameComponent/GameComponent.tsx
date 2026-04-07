import React, { useEffect, useMemo, useRef, useState } from 'react';
import './GameComponent.css';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import keycode from 'keycode'; // Import keycode


type TextWriterProps = {
    text: string
    level?: number
}
function TextWriter2(props: TextWriterProps) {
    const [inputText, setInputText] = useState('');
    const [startTime, setStartTime] = useState(0);
    const [currTime, setCurrTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [result, setResult] = useState(`Your current WPM is ${wpm}.`);
    const [currentInput, setCurrentInput] = useState<Array<{ char: string, correct: boolean }>>([]);
    const [isFocus, setIsFocus] = useState(false);
    const textToWrite = 'The quick text';



    const navigate = useNavigate();
    const targetText = useMemo(() => { return props.text.split("") }, [props.text]);

    const isOneOf = (event: Event, codes: string[]) => {
        return codes.some((code) => {
            return keycode.isEventKey(event, code);
        });
    }

    const keyUp = (e: React.KeyboardEvent<HTMLParagraphElement>) => {
        // console.log(currentInput);  
        let temp = keycode(e.nativeEvent);
        if (temp === "space") {
            temp = " ";
        }
        if (temp == "backspace") {

            currentInput.pop();
            setCurrentInput([...currentInput]);
            temp = ""
        }
        if (e.shiftKey && temp !== "shift" && temp !== "backspace") {
            temp = temp.toUpperCase();
        }

        if (!isOneOf(e.nativeEvent, ["shift", "ctrl", "alt", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10", "f11", "f12", "backspace", "esc"])) {
            setCurrentInput([...currentInput, {
                char: temp,
                correct: targetText[currentInput.length] === temp,
            }])
        }
    }



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { value } = e.target;             


        setInputText(value);
        setCurrTime(Date.now());
        const totalTime = (currTime - startTime) / 1000; // in seconds
        const words = value.split(' ').length;
        const wpm = Math.round((words / totalTime) * 60);
        setWpm(wpm);



        if (value == props.text) {
            if (typeof props.level != "undefined") {
                setResult(`You have finished level ${props.level}. Your WPM is ${wpm}. Good job!`);
                localStorage.setItem(String(props.level), JSON.stringify("true"))
            }
            else {
                setResult(`Your task is finish. Your WPM is ${wpm}. Good job!`);
                localStorage.setItem(String(props.level), JSON.stringify("true"))
            }

        }


    };

    useEffect(() => {
        setStartTime(Date.now());
    }, []);
    useEffect(() => {
        setEndTime(Date.now());
    }, [inputText]);

    const inputRef: React.RefObject<null | HTMLInputElement> = useRef(null)
    const renderResult = () => {
        // console.log("log res: ", currentInput);

        if (!isFocus) {
            return <span className='focusClick'>Click to focus</span>
        } else {
            const result = [];
            for (let i = 0; i < props.text.length; i++) {
                if (typeof currentInput[i] !== "undefined") {
                    result.push(<span key={i + props.text[i]} className={currentInput[i].correct ? "green-char" : "red-char"}>{props.text[i]}</span>);
                } else {
                    result.push(<span key={i + props.text[i]} className={"gray-char"}>{props.text[i]}</span>);
                }

            }
            return result;
        }

    }
    return (
        <div className='container'>
            <div className='textWriting' >

                <p className='textToWrite' onClick={() => {
                    const input = inputRef.current;
                    if (input) {
                        input.focus();
                    }
                }}>
                    {renderResult()}</p>
                <input ref={inputRef} className='inputTextToWrite' onKeyUp={keyUp} value={inputText} onChange={handleChange} onFocus={() => { setIsFocus(true) }} onBlur={() => { setIsFocus(false) }} />

                <p className='wpm'>{result}</p>
            </div>
            <button onClick={() => { navigate(-1) }}>Back</button>
        </div>
    );
}


export default TextWriter2;