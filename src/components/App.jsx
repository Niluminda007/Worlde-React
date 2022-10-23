import React ,{Component} from "react";
import { words } from "../Assets/words";
import "../styles/App.css";
import Interface from "./Interface";
import GameOverPopUp from "./GameOverPopUp";
import WordleContext from "../Context/WordleContext";
import axios from "axios";

class App extends Component{

    constructor(props){
        super(props)
        this.state = {
            wordleWord:"",
        
        }
    }

    componentDidMount(){
        this.setState((prevState)=>{
            let word = words[Math.floor(Math.random() * words.length)]
            return {
                ...prevState,
                wordleWord:word
            }
        })
       
    }
    handleRestart = ()=>{
        window.location.reload(false);
    }
    

    render(){
        const {wordleWord} = this.state
        const {game_over,user_won} = this.context

        if(wordleWord){
            console.log(wordleWord)
            return(
                <>
                    <h1 className="game-title">Wordle</h1>
                    <GameOverPopUp word={wordleWord}/>
                    {
                        <Interface word={this.state.wordleWord} />
                    }
                   {(game_over || user_won)&&<button className="restart-game" onClick={this.handleRestart}>Restart</button>}
                </>
            )

        }
        return
    }

}

App.contextType = WordleContext
export default App;