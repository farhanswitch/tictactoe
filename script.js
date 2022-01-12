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
    for(let y = 0;y<9;y++){
        if(cellElements[y].getAttribute('class') == 'cell'){
            cellElements[y].classList.add(CIRCLE_CLASS)
            boardCondition[y] = CIRCLE_CLASS
            break
        }
        
    }
    let result = winningCondition()
    if(result){
        theEnd(result)
        return null
    }
    playersTurn()
    
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
     let result = winningCondition()
     if(result){
         theEnd(result)
         return null
     }
    computersTurn()
   
}


function winningCondition(){
    if(boardCondition[0] == boardCondition[1] && boardCondition[1] == boardCondition[2] && boardCondition [0] != null){
        return boardCondition[0]
    }
    else if(boardCondition[3] == boardCondition[4] && boardCondition[4] == boardCondition[5] && boardCondition [3] != null){
        return boardCondition[3]
    }
    else if(boardCondition[6] == boardCondition[7] && boardCondition[7] == boardCondition[8] && boardCondition [8] != null){
        return boardCondition[8]
    }
    else if(boardCondition[0] == boardCondition[3] && boardCondition[3] == boardCondition[6] && boardCondition [6] != null){
        return boardCondition[6]
    }
    else if(boardCondition[1] == boardCondition[4] && boardCondition[4] == boardCondition[7] && boardCondition [7] != null){
        return boardCondition[7]
    }
    else if(boardCondition[2] == boardCondition[5] && boardCondition[5] == boardCondition[8] && boardCondition [8] != null){
        return boardCondition[8]
    }
    else if(boardCondition[0] == boardCondition[4] && boardCondition[4] == boardCondition[8] && boardCondition [8] != null){
        return boardCondition[8]
    }
    else if(boardCondition[2] == boardCondition[4] && boardCondition[4] == boardCondition[6] && boardCondition [6] != null){
        return boardCondition[6]
    }
    let notEmpty =  true
    boardCondition.forEach(data=>{
        if(data == null){
            notEmpty = false
        }
    })
    if(notEmpty){
        return 'draw'
    }
    else{return null}
    
}
