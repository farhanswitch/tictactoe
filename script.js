const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
let boardCondition = []
const winningMessage = document.querySelector('.winning-message')
const winner = document.querySelector('[data-winning-message-text]')
const restartBtn = document.getElementById('restartButton')
let players = {
    [X_CLASS]:'Player',
    [CIRCLE_CLASS]:'Computer'
}

startGame()
restartBtn.addEventListener('click',()=>{
    winningMessage.classList.remove('show')
    board.style.filter = 'blur(0)'
    startGame()
})

function startGame(){
    initialStep()
    playersTurn()
}

function initialStep(){
    //reset cell's class
    cellElements.forEach(cell=>{
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
    })
    //set default value of all cell to null
    for(let x = 0; x < 9; x++){
        boardCondition[x]=null
    }
}

function playersTurn(){
    //add click event handler on empty cell
    boardCondition.forEach((square,index)=>{
        if(square == null){
            cellElements[index].addEventListener('click',
          handleClick,{once:true})
        }
    })
     
     
      
      
      
}

function computersTurn(){
    let move
    let bestScore = -Infinity
    for(let y = 0;y<9;y++){
        if(boardCondition[y] == null){
                boardCondition[y] = CIRCLE_CLASS
                let score = minimax(boardCondition, 0, false)
                boardCondition[y] = null
                if(score > bestScore){
                    bestScore = score
                    move = y
                }
        }
        
    }
    boardCondition[move] = CIRCLE_CLASS
    cellElements[move].classList.add(CIRCLE_CLASS)
    let result = winningCondition(boardCondition)
    if(result){
        theEnd(result)
        return null
    }
    playersTurn()
    
}

let scores = {
    [X_CLASS]:-10,
    [CIRCLE_CLASS]:10,
    draw:0
}
function minimax(boards,depth,isMaximizing){
    let result = winningCondition(boards)
    if(result != null){
        return scores[result]
    }

    if(isMaximizing){
        let bestScore = -Infinity
        let score
        for(let i = 0;i < 9; i++){
            if(boards[i] == null){
                boards[i] = CIRCLE_CLASS
                score = minimax(boards,depth+1,false);  
                boards[i]=null
                if(score > bestScore){
                    bestScore = score
                }
            }
        }
        return bestScore
    }else{
        let bestScore = Infinity
        for(let i = 0 ; i < 9; i++){
            if(boards[i]== null){
                boards[i] = X_CLASS
                let score = minimax(boards,depth+1,true)
                boards[i] = null
                if(score<bestScore){
                    bestScore = score
                }
            }
        }
        return bestScore
    }
}

function theEnd(result){
    
    winningMessage.classList.add('show')
   result == 'draw'? winner.innerText = 'Hasil Imbang': winner.innerText = players[result] + ' Menang'
    board.style.filter = 'blur(10px)'
    removeClick()
    
}
function removeClick(){
    cellElements.forEach(cell=>{cell.removeEventListener('click',handleClick)
    }
    )
    
}
function handleClick(e){
    
    
    //add class to clicked cell
   
    const cell = e.target
    cell.classList.add(X_CLASS)
    //add value to board condition
    cellElements.forEach((cell,index)=>{
       if(cell.getAttribute('class') == 'cell x'){
          boardCondition[index] = X_CLASS
       }
    })
    removeClick()
     //check winning condition
     let result = winningCondition(boardCondition)
     if(result){
         theEnd(result)
         return null
     }
    computersTurn()
   
}


function winningCondition(board){
    if(board[0] == board[1] && board[1] == board[2] && board [0] != null){
        return board[0]
    }
    else if(board[3] == board[4] && board[4] == board[5] && board [3] != null){
        return board[3]
    }
    else if(board[6] == board[7] && board[7] == board[8] && board [8] != null){
        return board[8]
    }
    else if(board[0] == board[3] && board[3] == board[6] && board [6] != null){
        return board[6]
    }
    else if(board[1] == board[4] && board[4] == board[7] && board [7] != null){
        return board[7]
    }
    else if(board[2] == board[5] && board[5] == board[8] && board [8] != null){
        return board[8]
    }
    else if(board[0] == board[4] && board[4] == board[8] && board [8] != null){
        return board[8]
    }
    else if(board[2] == board[4] && board[4] == board[6] && board [6] != null){
        return board[6]
    }
    let notEmpty =  true
    console.log(board)
    board.forEach(data=>{
        if(data == null){
            notEmpty = false
        }
    })
    if(notEmpty){
        return 'draw'
    }
    else{return null}
    
}
