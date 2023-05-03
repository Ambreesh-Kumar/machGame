import './index.css'

const ScoreCard = props => {
  const {score, setInitialStatus} = props

  const onPlayAgain = () => {
    setInitialStatus()
  }
  return (
    <div className="score-card-bg-image">
      <img
        src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
        alt="trophy"
        className="trophy"
      />
      <p className="score-heading">YOUR SCORE</p>
      <p className="score">{score}</p>
      <button className="play-again-button" type="button" onClick={onPlayAgain}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
          alt="reset"
          className="play-again-img"
        />
        <p className="score-heading">PLAY AGAIN</p>
      </button>
    </div>
  )
}
export default ScoreCard
