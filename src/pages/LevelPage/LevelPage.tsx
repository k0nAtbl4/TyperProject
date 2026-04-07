import { useParams } from "react-router-dom";
import { TextWriter } from "../../components/GameComponent/TextWriter";
import { levels_data } from "../../levels_data";


const LevelPage = () => {

    const { levelId } = useParams()
    const level = levels_data.find(l => l.id === Number(levelId));
    const text = level?.text ?? "Level not found";

    return (
        <div className="main-container">
            <TextWriter text={text}/>
        </div>
    )
}

export default LevelPage;