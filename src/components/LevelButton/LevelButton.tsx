import React from "react";
import { useNavigate } from "react-router-dom";
import { useCompletedLevels } from "../../context/CompletedLevelsContext";
import "./LevelButton.css";

interface LevelCardButtonProps {
    id: number;
}

function LevelCardButton({ id }: LevelCardButtonProps) {
    const navigate = useNavigate();
    const { isCompleted } = useCompletedLevels();
    const completed = isCompleted(id);

    return (
        <div className={`level-button ${completed ? 'completed' : ''}`} onClick={() => navigate(`/level/${id}`)}>
            <span className="text">{id}</span>
            {completed && <span className="completed-badge">✓</span>}
        </div>
    );
}

export default LevelCardButton;