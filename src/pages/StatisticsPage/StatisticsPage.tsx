import { useStatistics } from '../../context/StatisticsContext';
import './StatisticsPage.css';

const StatisticsPage = () => {
    const { stats, clearStats } = useStatistics();

    if (stats.length === 0) {
        return (
            <div className="statistics-container">
                <h1 className="statistics-title">Statistics</h1>
                <p className="statistics-empty">No games played yet. Start typing to see your progress!</p>
            </div>
        );
    }

    const bestWpm = Math.max(...stats.map(s => s.wpm));
    const avgWpm = Math.round(stats.reduce((sum, s) => sum + s.wpm, 0) / stats.length);
    const avgAccuracy = Math.round(stats.reduce((sum, s) => sum + s.accuracy, 0) / stats.length);

    return (
        <div className="statistics-container">
            <h1 className="statistics-title">Statistics</h1>

            <div className="stats-summary">
                <div className="stat-card">
                    <span className="stat-card-value">{bestWpm}</span>
                    <span className="stat-card-label">Best WPM</span>
                </div>
                <div className="stat-card">
                    <span className="stat-card-value">{avgWpm}</span>
                    <span className="stat-card-label">Avg WPM</span>
                </div>
                <div className="stat-card">
                    <span className="stat-card-value">{avgAccuracy}%</span>
                    <span className="stat-card-label">Avg Accuracy</span>
                </div>
            </div>

            <div className="stats-history">
                <h2>Recent Games</h2>
                <button className="clear-button" onClick={clearStats}>Clear All</button>
                <div className="history-list">
                    {stats.map((stat, index) => (
                        <div key={stat.timestamp} className="history-item">
                            <span className="history-index">#{index + 1}</span>
                            <span className="history-wpm">{stat.wpm} WPM</span>
                            <span className="history-accuracy">{stat.accuracy}%</span>
                            <span className="history-date">
                                {new Date(stat.timestamp).toLocaleDateString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default StatisticsPage;
