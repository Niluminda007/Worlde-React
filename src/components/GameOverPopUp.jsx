import React,{Component} from "react";
import WordleContext from "../Context/WordleContext";
import "../styles/popUp.css";

class GameOverPopUp extends Component{
    
    handleClose = ()=>{
        const {togglePopUP} = this.context
        togglePopUP()
    }

    handleRestart = ()=>{
        window.location.reload(false);
    }

    render(){
        const {user_won,popupOpen} = this.context
        
        return(
            <>
            <div className={`${popupOpen ? 'popup-layover' : ''}`}></div>
            <div className={`popup-modal ${popupOpen ? 'popup-modal--open': ""}`}>
            
            {
                user_won? <h3 className="win-tex heading-popup">Congratulations!!!,<br/> You Won</h3>
                :<div>
                    <p className="correct-word"><span className="correct-heading">Correct-Word: </span>{this.props.word}</p>
                    <h3 className="loose-text heading-popup">Game Over</h3>
                </div>
            
            }
            <div className="button-container">
            <button className="restart btn" onClick={this.handleRestart}>Restart</button> 
            <button className="close btn" onClick={this.handleClose}>Close</button>
            </div>
            </div>
            </>
        )
    }
}

GameOverPopUp.contextType = WordleContext

export default GameOverPopUp