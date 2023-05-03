import {Component} from 'react'
import TabItems from '../TabItems'
import ImageItems from '../ImageItems'
import ScoreCard from '../scoreCard'
import './index.css'

class MatchGameManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabsList: props.tabsList,
      imagesList: props.imagesList,
      score: 0,
      time: 60,
      isMached: true,
      currentId: props.imagesList[0].id,
      defaultImage: props.imagesList[0].imageUrl,
      defaultThumbnailsCategory: props.imagesList.filter(
        eachImageItem => eachImageItem.category === 'FRUIT',
      ),
    }
  }

  componentDidMount() {
    this.startTimer()
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  startTimer = () => {
    const {time, isMached, imagesList, score} = this.state
    const totalImages = imagesList.length
    if (time > 0 && isMached === true && score < totalImages) {
      this.timerId = setInterval(() => {
        this.setState(prevState => ({time: prevState.time - 1}))
      }, 1000)
    } else if (time === 0 && isMached === false) {
      this.stopTimer()
    }
  }

  stopTimer = () => {
    clearInterval(this.timerId)
  }

  changeTabAndThumbnail = id => {
    const {imagesList} = this.state
    const filteredThumbnailsList = imagesList.filter(
      eachThumbnail => eachThumbnail.category === id,
    )
    this.setState({defaultThumbnailsCategory: filteredThumbnailsList})
  }

  matchThumbnailWithImage = ImageId => {
    const {currentId, imagesList, isMached} = this.state

    const newImageObject =
      imagesList[Math.floor(Math.random() * imagesList.length - 1)]
    const {id, imageUrl} = newImageObject
    if (currentId === ImageId) {
      this.setState(prevState => ({
        score: prevState.score + 1,
        currentId: id,
        defaultImage: imageUrl,
        isMached: true,
      }))
    } else {
      this.setState({isMached: false}, () => {
        this.startTimer()
      })
    }
  }

  setInitialStatus = () => {
    const {score, time, isMached} = this.state
    this.setState({
      time: 60,
      isMached: true,
      score: 0,
    })
  }

  render() {
    const {
      score,
      time,
      isMached,
      defaultImage,
      tabsList,
      imagesList,
      defaultThumbnailsCategory,
    } = this.state
    return (
      <div className="bg-container">
        <ul className="game-header">
          <li>
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png "
              alt="website logo"
              className="game-logo"
            />
          </li>
          <li>
            <div className="score-time-container">
              <p className="score">
                Score: <span className="score-count">{score}</span>
              </p>
              <div className="timer-image-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                  alt="timer"
                  className="clock-image"
                />
                <p className="score-count">{time} sec</p>
              </div>
            </div>
          </li>
        </ul>

        {time === 0 || isMached === false || score === imagesList.length ? (
          <div className="score-card-container">
            <ScoreCard score={score} setInitialStatus={this.setInitialStatus} />
          </div>
        ) : (
          <div className="game-bottom-container">
            <img src={defaultImage} alt="match" className="displayed-image" />
            <ul className="tab-list">
              {tabsList.map(eachTab => (
                <TabItems
                  tabObject={eachTab}
                  key={eachTab.tabId}
                  changeTabAndThumbnail={this.changeTabAndThumbnail}
                />
              ))}
            </ul>
            <ul className="thumbnail-image-list">
              {defaultThumbnailsCategory.map(eachImageItem => (
                <ImageItems
                  imageObject={eachImageItem}
                  key={eachImageItem.id}
                  matchThumbnailWithImage={this.matchThumbnailWithImage}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}
export default MatchGameManager
