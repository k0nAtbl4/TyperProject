
import './HomePage.css';
import { TextWriter } from '../../components/GameComponent/TextWriter';

const HomePage = () => {
    const fullText = "a a a a a a a b b b b b b ba ba ab a a ba bab a bba a a ba a b ab a ba b a ba ab a";

    return (
        <div className="main-container">
            <TextWriter text={fullText} />
        </div>
    )
}

export default HomePage;
