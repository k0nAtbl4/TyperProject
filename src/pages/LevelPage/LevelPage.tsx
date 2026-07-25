import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TextWriter } from "../../components/GameComponent/TextWriter";
import { api } from "../../api/api";


const LevelPage = () => {
    const { levelId } = useParams();
    const [text, setText] = useState<string>("Loading...");
    const [error, setError] = useState(false);

    useEffect(() => {
        const id = Number(levelId);
        if (isNaN(id)) {
            setError(true);
            return;
        }
        api.getTask(id)
            .then(task => setText(task.text))
            .catch(() => setError(true));
    }, [levelId]);

    return (
        <div className="main-container">
            {error ? (
                <TextWriter text="Level not found" />
            ) : (
                <TextWriter text={text} level={Number(levelId)} />
            )}
        </div>
    )
}

export default LevelPage;