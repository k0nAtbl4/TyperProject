import { useParams } from "react-router-dom";
import LevelCardButton from "../../components/LevelButton/LevelButton";
import "./LevelsListPage.css";


const LevelListPage = () => {


    
    return (
        <div className="main-container">
            <LevelCardButton id={0}></LevelCardButton>
            <LevelCardButton id={1}></LevelCardButton>
            <LevelCardButton id={2}></LevelCardButton>
        </div>
    )
}

export default LevelListPage;