const Board = () => {

    const board = [
        ['R','','R','','R','', 'R',''],
        ['','R','','R','','R', '','R'],
        ['R','','R','','R','', 'R',''],
        ['','','','','','', '',''],
        ['','','','','','', '',''],
        ['B','','B','','B','', 'B',''],
        ['','B','','B','','B', '','B'],
        ['B','','B','','B','', 'B','']
    ]




    return ( <div className="board">
        {
            board.map( row => 
                <div style={{display:'flex', padding:'10px'}}>
                { row.map(
                        cell => {
                            if(cell === 'R'){
                                return <div style={{backgroundColor:'red', padding:'10px'}}>{cell}</div>
                            }else if(cell === 'B'){
                                return <div style={{backgroundColor:'blue', padding:'10px'}}>{cell}</div>
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