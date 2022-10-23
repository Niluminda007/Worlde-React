import React,{Component,createRef} from "react";
import "../styles/interface.css";
import RowInterface from "./RowInterface";
import { words } from "../Assets/words";
import WordleContext from "../Context/WordleContext";

class Interface extends Component{
    constructor(props){
        super(props)
        this.state = {
            activeRow:0,
            wrongWord:false,
            incorrectLength:false
        }
        
        const inputFields = ["inputField0","inputField1","inputField2","inputField3","inputField4"]

        inputFields.forEach( inputField=>{
            this[inputField] = createRef()
        })
    }

   componentDidMount(){
        this[`inputField0`].current.focus()
        this.handleOutsideClicks()
   }

   componentDidUpdate(){
   
        const {wrongWord,incorrectLength} = this.state
        const {user_won,activeRow} = this.context
        
        if(!user_won){
            if(activeRow !== 0 && activeRow !== 5){
                const newROWID = `inputField${activeRow}`
                this[newROWID].current.focus()
            }
            if(activeRow === 5){
                console.log("Game Over")
                
            }
            this.handleOutsideClicks()
        }

        if(wrongWord || incorrectLength){
            setTimeout(()=>{
                this.setState(state=>{
                    if(wrongWord){
                        return{
                            ...state,
                            wrongWord:!state.wrongWord
                        }
                    }
                    else{
                        return{
                            ...state,
                            incorrectLength:!state.incorrectLength
                        }
                    }
                })

            },1000)
        }

    }
    
    handleOutsideClicks(){
        document.addEventListener("click",()=>{
            const {activeRow} = this.context
            const {user_won} = this.context
            if(!user_won){
                this[`inputField${activeRow}`].current.focus()
            }
        })
    }

   styleRow(status,elementID,tDelay){
        
        const element = document.getElementById(elementID)
        if(element){
            switch (status) {
                case "CORRECT":
                    element.style.transitionDelay = `${tDelay}s`
                    element.classList.add("corect-position","item-front-flip")
                    break;

                case "PARTIAL":
                    element.style.transitionDelay = `${tDelay}s`
                    element.classList.add("partial-correct-position","item-front-flip")
        
                    break;
                case "WRONG":
                    element.style.transitionDelay = `${tDelay}s`
                    element.classList.add("not-correct-position","item-front-flip")
                    break;
                default:
                    break;
            }

        }
}

   checkWord = (guess)=>{
        const {word} = this.props
        if(guess.length !== word.length){
            this.setState(state=>{
                return{
                    ...state,
                    incorrectLength:true
                }
            })
            console.log("Please Check the input word")
        }
        else{
            guess  = guess.toUpperCase()
            
            if(!words.includes(guess)){
                console.log("It's Not in the word Bank")
                this.setState(state=>{
                    return{
                        ...state,
                        wrongWord:true
                    }
                })
            }
            else{
                const {changeActiveRow,activeRow} = this.context
                changeActiveRow()
                
                if(guess === word){
                    console.log("Impressive")
                    const {setUserWin} = this.context
                    setUserWin()
                }

                let pointerA = 0
                while (pointerA < word.length ) {
                    
                    const elementID = `${activeRow}${pointerA}`
                    const tDelay = pointerA*0.2;
                    if (word[pointerA] === guess[pointerA]) {
                        this.styleRow("CORRECT",elementID,tDelay)
                    }
                    else if (word[pointerA] !== guess[pointerA] && word.includes(guess[pointerA])) {
                        this.styleRow("PARTIAL",elementID,tDelay)
                    } else if (word[pointerA] !== guess[pointerA] && !word.includes(guess[pointerA])) {
                        this.styleRow("WRONG",elementID,tDelay)
                    }
                    pointerA+=1

                }
            }
            }
    }


    render(){
        const {incorrectLength,wrongWord} = this.state
        
        return(
            <div className="input-container">
            {wrongWord && <h3 className="wrong-word">It's Not in the Word Bank</h3>}
            {incorrectLength && <h3 className="incorrect-Length">Please Check the Length of the Word</h3>}
            {
                [...Array(5).keys()].map( (item,index)=>{
                    return <RowInterface key={index} id={index} inputRef={this[`inputField${index}`]} checkGuess={this.checkWord} />
                })
            }
            
            </div>

        )
    }
}
Interface.contextType = WordleContext;

export default Interface