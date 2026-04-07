import { useParams } from "react-router-dom";
import TextWriter from "../../components/GameComponent/GameComponent";


const LevelPage = () => {

    const { levelId } = useParams()
    
    return (
        <div className="main-container">
            <TextWriter text={"quick text"}/>
        </div>
    )
}

export default LevelPage;