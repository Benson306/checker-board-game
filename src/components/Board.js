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

            if (colDiff !== rowDiff) {
                // The move is not diagonal
                console.log('The move is diagonal')
                return;
            }

            //Red to move forwad
            if(currentCell == 'R'){
                if(fromRow > toRow){
                    console.log("Backward movement")
                    return
                }
            }

            //Red to move forwad
            if(currentCell == 'B'){
                if(fromRow < toRow){
                    console.log("Backward movement")
                    return
                }
            }

            dispatch({ type: 'MOVE', payload: { fromRow, fromCol, toRow, toCol } });
        }
    },[toRow])


    function handleClick(row, col) {
        console.log(row,col)
        // Logic for checking if the clicked square is a valid move goes here
        const board = state.board;
        const currentPiece = board[fromRow][fromCol]

        

        if(clickedCount  == 2){ //Check if user has clicked the from cell and to cell only
            console.log('Out of play')
            //clickedCount = 0;
            //return
        }else if(clickedCount == 0){
            setFromRow(row);
            setFromCol(col)

        }else if(clickedCount == 1){

            //Check Valididity of moves

            //Ensure Moves are diagonal

            
            
                setToRow(row)
                setToCol(col)
            

            
        }
        
        setClickedCount( clicked => clicked + 1)

        console.log(currentPiece)

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