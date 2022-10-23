import React,{Component} from "react";
import WordleContext from "../Context/WordleContext";

class RowInterface extends Component{
    constructor(props){
        super(props)
        this.state={
            userInput:""
        }
    }

    handleChange = (e)=>{
        let {key} = e
        
        var reg = /^[a-zA-Z]$/i;
        const {user_won} = this.context
        if(reg.test(key)){
            key = key.toUpperCase()
            this.setState(state=>{
                if(state.userInput.length >4){
                    return state
                }
                return {
                    ...state,
                    userInput:state.userInput + key
                }
            })
        }
        if(key ==="Enter" && !user_won){
            const {checkGuess} = this.props
            const {userInput} = this.state
            checkGuess(userInput)
        }
        if(key === "Backspace" && !user_won){
            this.setState((prevState)=>{
                if (prevState.userInput.length <1){
                    return {
                        ...prevState,
                        userInput:""
                    }
                }
                return {
                    ...prevState,
                    userInput:(prevState.userInput).slice(0,-1)
                }
            })
            
        }
    }
    render(){
        return(
            <>
            <div className="user-input">
                <input type="text" className="input-field" value={this.state.userInput} onKeyDown={this.handleChange}   ref={this.props.inputRef} readOnly={true}/>
            </div>
            <div className="wordle-row-container">
            {
                [...Array(5).keys()].map((item,index)=>{
                    const characterID = (this.props.id).toString() + index.toString()
                    let isCharacterThere = false
                    let character = ""
                    if(this.state.userInput.length>=index){
                        isCharacterThere = true
                        character = [...this.state.userInput][index]
                    }
                    
                return (
                    <div className="character-box" key={index} id={characterID} >{isCharacterThere&&character}</div>
                )
            })
            }
            </div>

            </>
        )
    }
}
RowInterface.contextType = WordleContext

export default RowInterface