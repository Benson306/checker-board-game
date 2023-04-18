export const initialState = {
    board : [
        ['R','','R','','R','', 'R',''],
        ['','R','','R','','R', '','R'],
        ['R','','R','','R','', 'R',''],
        ['','','','','','', '',''],
        ['','','','','','', '',''],
        ['','B','','B','','B', '','B'],
        ['B','','B','','B','', 'B',''],
        ['','B','','B','','B', '','B']
    ],
    currentPlayer: 'R',
    redPoints: 0,
    bluePoints: 0
}

export function Reducer(state, action){
    switch(action.type){
        case 'MOVE':
            const { fromRow, fromCol, toRow, toCol } = action.payload;
            const board = [...state.board];           
            board[toRow][toCol] = board[fromRow][fromCol]

            board[fromRow][fromCol] = ''
            
            return {
                ...state,
                board,
                currentPlayer: state.currentPlayer === 'R' ? 'B' : 'R'
              };
        case 'SCORE':
            const { row, col} = action.payload;
            const newBoard = [...state.board];
            const currentPlayer = state.currentPlayer;
            let redPoints = state.redPoints;
            let bluePoints = state.bluePoints;

            newBoard[row][col] = '';

            if(currentPlayer == 'R'){
                redPoints++;
            }else{
                bluePoints++;
            }

            return {
                ...state,
                board: newBoard,
                redPoints,
                bluePoints
            }
        default:
            return state;
    }
         
}