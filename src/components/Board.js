import { useEffect, useReducer, useState } from "react";
import { initialState, Reducer } from "./Reducer";

const Board = () => {

    const [state, dispatch] = useReducer(Reducer, initialState);

    const [toRow, setToRow] = useState(0);
    const [toCol, setToCol] = useState(0);

    const [fromRow, setFromRow] = useState(0);
    const [fromCol, setFromCol] = useState(0);

    const currentPlayer = state.currentPlayer;


    const [clickedCount, setClickedCount] = useState(0);

    useEffect(()=>{
        setClickedCount(0)
    }, [currentPlayer])

    useEffect(()=>{
        const board = state.board;

        if(toRow){

            let currentCell = board[fromRow][fromCol];

            let nextCell = board[toRow][toCol];

            if (nextCell !== '') {
                // There is already a piece at the destination square
                console.log('There is a piece at the destination')
                return;
            }

            const rowDiff = Math.abs(toRow - fromRow);
            const colDiff = Math.abs(toCol - fromCol);

            //Only One move forward
            if(rowDiff > 2){
                console.log('More Than Two Step forward is Not allowed')
                return
            }

            if (colDiff !== rowDiff) {
                // The move is not diagonal
                console.log('The move is not diagonal')
                return;
            }

            //Red to move forwad
            if(currentCell == 'R'){
                if(fromRow > toRow){
                    console.log("Backward movement Not allowed")
                    return
                }
            }


            if(rowDiff == 2){ //jump
                let jumpedRow = (fromRow + toRow) / 2;
                let jumpedCol = (fromCol + toCol) / 2; 
                
                //Restrict jumping your own piece
                if(currentCell == board[jumpedRow][jumpedCol]){
                    console.log('You cannot jump your own piece')
                    return
                }

                dispatch({ type: 'SCORE', payload: { row: jumpedRow, col: jumpedCol}})
                //return
            }

            //Manage backward Movement
            if(currentCell == 'B'){
                if(fromRow < toRow){
                    console.log("Backward movement Not allowed")
                    return
                }
            }

            dispatch({ type: 'MOVE', payload: { fromRow, fromCol, toRow, toCol } });
        }
    },[toRow])


    function handleClick(row, col) {  

        if(clickedCount  == 2){ //Check if user has clicked the from cell and to cell only
            console.log('Out of play')
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
                                    return <div onClick={() => handleClick(rowIndex, colIndex)} style={{backgroundColor:'gray', padding:'10px', display:'flex', alignItems:'center', justifyContent:'center' ,border: '1px solid black', borderWidth:1, width:40, height:40}}><img src={require('../assets/red-cap.png')} width={40} height={40} object-fit="contain" /></div>
                                }else if(col === 'B'){
                                    return  <div onClick={() => handleClick(rowIndex, colIndex)} style={{backgroundColor:'blue', padding:'10px', display:'flex', alignItems:'center', justifyContent:'center' ,border: '1px solid black', borderWidth:1, width:40, height:40}}><img src={require('../assets/bottle-cap.png')} width={40} height={40} object-fit="contain" /></div>
                                }else if(col === ''){
                                    return <div onClick={() => handleClick(rowIndex, colIndex)} style={{backgroundColor:'yellow', padding:'10px', border:'1px solid black', borderWidth:1, width:40, height:40}}>{col}</div>
                                }
                        }
                        )
                } 
                </div>
            )
        }
        <div>
            <h3>Red Points : {state.redPoints} </h3>
            <h3>Blue Points : {state.bluePoints} </h3>
        </div>
    </div> );
}
 
export default Board;