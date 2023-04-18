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
    bluePoint: 0
}

export function Reducer(state, action){
    switch(action.type){
        case 'MOVE':
            const { fromRow, fromCol, toRow, toCol } = action.payload;
            const board = [...state.board];           
            board[toRow][toCol] = board[fromRow][fromCol]

            board[fromRow][fromCol] = ''

            //console.log( fromRow, fromCol, toRow, toCol )
            

            return {
                ...state,
                board,
                currentPlayer: state.currentPlayer === 'R' ? 'B' : 'R'
              };
        default:
            return state;
    }
         
}