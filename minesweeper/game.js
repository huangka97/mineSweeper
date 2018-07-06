function printBoard(board) {
  var formatedBoard = board.map(function(row) {
    return row.join(',')
  }).join('\n')
  console.log(formatedBoard)
}

function dropBomb(board, row, col) {
  board[row][col] = 'B'
}
var bombCounter=0;
function checkNeighbors(board,row,col){
  bombCounter=0;
  //console.log(row,col);
  //console.log(Number($("#game-size").val())-1)
  //LEFT TOP CORNER
  //console.log()
  //console.log(board[row+1][col]);
  /*if(row==0 && col==0){
    //console.log("ENTERED")
    //console.log(board[1][0]);
    if(board[row+1][col]=="B"){
      //console.log("inner1")
      bombCounter++;
    }
    if(board[row+1][row+1]=="B"){
      bombCounter++;
    }
    if(board[row][col+1]=='B'){
      //console.log("inner3")
      bombCounter++;
    }

  }
  //RIGHT TOP CORNER
  else if(row==0 && col==Number($("#game-size").val())-1){
    //console.log("RIGHT TOP")
    if(board[row][col-1]=="B"){
      //console.log("TEST1");
      bombCounter++;
    }
    if(board[row+1][col-1]=="B"){
      //console.log("TEST2");
      bombCounter++;
    }
    if(board[row+1][col]=="B"){
      //console.log("TEST3");
      bombCounter++;
    }
  }
  //RIGHT BOTTOM CORNER
  else if(row==Number($("#game-size").val())-1  && col==Number($("#game-size").val())-1 ){
    //console.log("ENTEREDDD")
    if(board[row-1][col]=="B"){
      //console.log("INNER1");
      bombCounter++;
    }
    if(board[row-1][col-1]=="B"){
      //console.log("INNER2");
      bombCounter++;
    }
    if(board[row][col-1]=="B"){
      //console.log("INNER3");
      bombCounter++;
    }
  }
  //LEFT BOTTOM CORNER
  else if(row==Number($("#game-size").val())-1  && col==0){
    //console.log("ENTERED")
    if(board[row-1][col]=="B"){
      bombCounter++;
    }
    if(board[row][col+1]=="B"){
      //console.log("inner");
      bombCounter++;
    }
    if(board[row-1][col+1]=="B"){
      bombCounter++;
    }
  }

  //console.log(bombCounter)*/
  var possible = [
    [row + 1, col],
    [row - 1, col],
    [row, col + 1],
    [row, col - 1],
    [row + 1, col - 1],
    [row - 1, col + 1],
    [row + 1, col + 1],
    [row - 1, col - 1]
  ];

  var neighbors = [];
  for (var i = 0; i < possible.length; i++) {
    if (possible[i][0] < Number($("#game-size").val()) && possible[i][1] < Number($("#game-size").val()) && possible[i][0] >= 0 && possible[i][1] >= 0) {
      neighbors.push(possible[i]);
    }
  }
  console.log(neighbors.length);
  $.each(neighbors,function(index,value){
    var rowdummy=value[0];
    var coldummy=value[1];
    //console.log(board[rowdummy][coldummy])
    if(board[rowdummy][coldummy]=="B"){
      bombCounter++;
    }
  });

  return bombCounter;
}

function drawBoard(board) {
  //console.log(board);
  var boardEl = $('#game-board')
  //console.log(boardEl);
  boardEl.html('')

  for(var i = 0; i < board.length; i++) {
    var rowEl = $('<div class="row"></div>')

    for(var j = 0; j < board.length; j++) {
      var cellEl = $(`<div row="${i}" col="${j}" state="${board[i][j]}" class="cell">&nbsp</div>`)
      
      cellEl.on('click', function(event) {

        var el = $(this)
        //console.log(el.attr('row'), el.attr('col'), el.attr('state'))
        if(el.attr('state')=="B"){
          alert("BOMB");
      
        }

        //CORNER CASE
        
        var neighborsCount=checkNeighbors(board,+el.attr('row'),+el.attr('col'));
        //console.log(neighborsCount);
        el.text(neighborsCount);

        //el.toggleClass("red");
        bombCounter=0;
      })
      rowEl.append(cellEl)
    }

    boardEl.append(rowEl)
  }
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


$(document).ready(function() {
  $("#start-game").on('click', function() {
    var size = Number($("#game-size").val())
    var mineCount = Number($("#mine-count").val())

    var gameBorad = []
    for(var i = 0 ; i < size; i++) {
      var row = [] // row
      gameBorad[i] = row
      for(var j = 0; j < size; j++) {
        row[j] = '?'
      }
    }

    // your code here to add the bombs
    while(mineCount--) {
      var x=getRandomInt(Number($("#game-size").val()));
      var y=getRandomInt(Number($("#game-size").val()));
      //Double Check Coordinates
      dropBomb(gameBorad,x,y)
    }

    printBoard(gameBorad)
    drawBoard(gameBorad)
  })


})