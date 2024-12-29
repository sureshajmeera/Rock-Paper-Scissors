import {Component} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {RiCloseLine} from 'react-icons/ri'

import './App.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class App extends Component {
  state = {
    score: 0,
    gameStatus: '',
    show: false,
    clickedImage: [],
    generatedImage: [],
  }

  getGame = event => {
    const {score} = this.state
    const getRandomNumber = Math.floor(Math.random() * choicesList.length)
    if (event.target.id === 'ROCK') {
      if (choicesList[getRandomNumber].id === 'SCISSORS') {
        this.setState(prevState => ({
          score: prevState.score + 1,
          gameStatus: 'YOU WON',
        }))
      } else if (choicesList[getRandomNumber].id === event.target.id) {
        this.setState({score, gameStatus: 'IT IS DRAW'})
      } else {
        this.setState(prevState => ({
          score: prevState.score - 1,
          gameStatus: 'YOU LOSE',
        }))
      }
    } else if (event.target.id === 'SCISSORS') {
      if (choicesList[getRandomNumber].id === 'PAPER') {
        this.setState(prevState => ({
          score: prevState.score + 1,
          gameStatus: 'YOU WON',
        }))
      } else if (choicesList[getRandomNumber].id === event.target.id) {
        this.setState({score, gameStatus: 'IT IS DRAW'})
      } else {
        this.setState(prevState => ({
          score: prevState.score - 1,
          gameStatus: 'YOU LOSE',
        }))
      }
    } else if (event.target.id === 'PAPER') {
      if (choicesList[getRandomNumber].id === 'ROCK') {
        this.setState(prevState => ({
          score: prevState.score + 1,
          gameStatus: 'YOU WON',
        }))
      } else if (choicesList[getRandomNumber].id === event.target.id) {
        this.setState({score, gameStatus: 'IT IS DRAW'})
      } else {
        this.setState(prevState => ({
          score: prevState.score - 1,
          gameStatus: 'YOU LOSE',
        }))
      }
    }
    const getClickedImage = choicesList.find(
      each => each.id === event.target.id,
    )
    this.setState({
      show: true,
      generatedImage: choicesList[getRandomNumber],
      clickedImage: getClickedImage,
    })
  }

  playAgainButton = () => {
    this.setState({show: false})
  }

  render() {
    const {score, gameStatus, show, generatedImage, clickedImage} = this.state

    return (
      <div className="main-Container">
        <h1>Rock Paper Scissors</h1>
        <p className="score">Score : {score}</p>
        {show ? (
          <div>
            <h1>Rock Paper Scissors</h1>
            <div className="result_container">
              <div>
                <p>You</p>
                <img
                  src={clickedImage.imageUrl}
                  alt="your choice"
                  className="images two"
                />
              </div>
              <div>
                <p>opponent</p>
                <img
                  src={generatedImage.imageUrl}
                  alt="opponent choice"
                  className="images two"
                />
              </div>
            </div>
            <p>{gameStatus}</p>
            <button type="button" onClick={this.playAgainButton}>
              PLAY AGAIN
            </button>
          </div>
        ) : (
          <div>
            {choicesList.map(each => (
              <button
                className="images"
                type="button"
                key={each.id}
                data-testid={each.id}
                onClick={this.getGame}
              >
                <img
                  src={each.imageUrl}
                  id={each.id}
                  alt={each.id}
                  className="images"
                />
              </button>
            ))}

            <Popup
              modal
              trigger={
                <button type="button" className="trigger-button">
                  RULES
                </button>
              }
            >
              {close => (
                <button
                  type="button"
                  className="trigger-button-close"
                  onClick={() => close()}
                >
                  <RiCloseLine />
                </button>
              )}
              <img
                src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                alt="rules"
                className="popup"
              />
            </Popup>
          </div>
        )}
      </div>
    )
  }
}

export default App
