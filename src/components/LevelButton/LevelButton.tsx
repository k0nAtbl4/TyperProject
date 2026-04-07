import React from "react";
import { useNavigate } from "react-router-dom";
import "./LevelButton.css";

interface LevelCardButtonProps {
    id: number;
}

function LevelCardButton({ id }: LevelCardButtonProps) {
    const navigate = useNavigate();

    return (
        <div className="level-button" onClick={() => navigate(`/level/${id}`)}>
            <span className="text">{id}</span>
        </div>
    );
}

export default LevelCardButton;