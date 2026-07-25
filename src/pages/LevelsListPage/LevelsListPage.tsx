import { useEffect, useState } from "react";
import LevelCardButton from "../../components/LevelButton/LevelButton";
import { api } from "../../api/api";
import type { Task } from "../../api/api";
import "./LevelsListPage.css";


const LevelListPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getTasks()
            .then(setTasks)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="main-container">
            <h1 className="levels-title">Choose Your Level</h1>
            <p className="levels-subtitle">Practice makes perfect. Select a challenge below.</p>
            {loading ? (
                <p>Loading...</p>
            ) : (
                tasks.map(task => (
                    <LevelCardButton key={task.id} id={task.id}></LevelCardButton>
                ))
            )}
        </div>
    )
}

export default LevelListPage;