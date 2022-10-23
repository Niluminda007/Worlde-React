import React,{Component,createContext} from "react";

const WordleContext = createContext()
export const WorldeConsumer = WordleContext.Consumer

export class WordleProvider extends Component{
    constructor(props){
        super(props)
        this.state={
            user_won:false,
            popupOpen:false,
            game_over:false,
            activeRow:0
        }
    }

   
    changeActiveRow= ()=>{
        this.setState(state=>{
            if(state.activeRow === 4){
                return {
                    ...state,
                    game_over:true,
                    popupOpen:true
                }
            }
            return{
                ...state,
                activeRow:state.activeRow + 1
            }
        })
    }

    setUserWin=()=>{
        this.setState(state=>{
            return{
                ...state,
                user_won:true,
                popupOpen:true
            }
        })
    }
    
    togglePopUP=()=>{
        
        this.setState(state=>{
                return {
                    ...state,
                    popupOpen:!state.popupOpen
                }
        })

    }



    render(){
        const {user_won,popupOpen,activeRow,game_over} = this.state
        const {setUserWin,togglePopUP,changeActiveRow} = this
        return(
            <WordleContext.Provider value={{
                user_won,
                popupOpen,
                activeRow,
                game_over,
                setUserWin,
                togglePopUP,
                changeActiveRow,

            }}>
                {this.props.children}
            </WordleContext.Provider>
        )
    }

}

export default WordleContext