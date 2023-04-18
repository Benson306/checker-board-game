import { useEffect, useReducer, useState } from "react";
import { initialState, Reducer } from "./Reducer";

const Board = () => {

    const [state, dispatch] = useReducer(Reducer, initialState);

    const [toRow, setToRow] = useState(0);
    const [toCol, setToCol] = useState(0);

    const [fromRow, setFromRow] = useState(0);
    const [fromCol, setFromCol] = useState(0);


    const [clickedCount, setClickedCount] = useState(0);

    useEffect(()=>{
        
        if(toRow){
            dispatch({ type: 'MOVE', payload: { fromRow, fromCol, toRow, toCol } });
        }
    },[toRow])


    function handleClick(row, col) {
        // Logic for checking if the clicked square is a valid move goes here
        // dispatch({ type: 'MOVE', payload: { fromRow, fromCol, toRow, toCol } });


        if(clickedCount  == 2){
            console.log('Out of play')
            //clickedCount = 0;
            //return
        }else if(clickedCount == 0){
            setFromRow(row);
            setFromCol(col)
        }else if(clickedCount == 1){

            setToRow(row)
            setToCol(col)
        }
        
        setClickedCount( clicked => clicked + 1)

    }

    return ( <div className="board" style={{padding: '10px', alignSelf:'center'}}>
        <div>Current Player: {state.currentPlayer}</div>
        <br /><br />
        {
            state.board.map( (row, rowIndex) => 
                <div style={{display:'flex'}}>
                { row.map(
                        (col, colIndex) => {
                            if(col === 'R'){
                                return <div onClick={() => handleClick(rowIndex, colIndex)} style={{backgroundColor:'red', padding:'10px', border:'1px solid black', borderWidth:1, width:15, height:15}}>{col}</div>
                            }else if(col === 'B'){
                                return <div onClick={() => handleClick(rowIndex, colIndex)} style={{backgroundColor:'blue', padding:'10px', border:'1px solid black', borderWidth:1, width:15, height:15}}>{col}</div>
                            }else if(col === ''){
                                return <div onClick={() => handleClick(rowIndex, colIndex)} style={{backgroundColor:'', padding:'10px', border:'1px solid black', borderWidth:1, width:15, height:15}}>{col}</div>
                            }
                        }
                        )
                } 
                </div>
            )
        }
    </div> );
}
 
export default Board;