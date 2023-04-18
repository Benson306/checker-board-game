export const initialState = {
    board : [
        ['R','','R','','R','', 'R',''],
        ['','R','','R','','R', '','R'],
        ['R','','R','','R','', 'R',''],
        ['','','','','','', '',''],
        ['','','','','','', '',''],
        ['B','','B','','B','', 'B',''],
        ['','B','','B','','B', '','B'],
        ['B','','B','','B','', 'B','']
    ],
    currentPlayer: 'R'  
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
                currentPlayer: state.currentPlayer === 'R' ? 'B' : 'R',
              };
        default:
            return state;
    }
         
}