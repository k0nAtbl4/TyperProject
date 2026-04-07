import LevelCardButton from "../../components/LevelButton/LevelButton";
import { levels_data } from "../../levels_data";
import "./LevelsListPage.css";


const LevelListPage = () => {

    return (
        <div className="main-container">
            {levels_data.map(level => (
                <LevelCardButton key={level.id} id={level.id}></LevelCardButton>
            ))}
        </div>
    )
}

export default LevelListPage;