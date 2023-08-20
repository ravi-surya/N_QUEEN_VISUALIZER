document.addEventListener("DOMContentLoaded", () => {
    const numberbox = document.getElementById("numberbox");
    const solveButton = document.getElementById("solve-button");
    const chessboard = document.getElementById("chessboard");
  
    solveButton.addEventListener("click", () => {
      const boardSize = parseInt(numberbox.value);
      if (isNaN(boardSize) || boardSize <= 0) {
        alert("Please enter a valid board size.");
        return;
      }
      solveNQueens(boardSize);
    });
  
    async function solveNQueens(n) {
      const board = new Array(n).fill(0).map(() => new Array(n).fill(0));
      await backtrack(0);
  
      async function backtrack(row) {
        if (row === n) {
          await drawBoard(board);
          return true;
        }
        for (let col = 0; col < n; col++) {
          if (isSafe(row, col)) {
            board[row][col] = 1;
            await drawBoard(board);
            if (await backtrack(row + 1)) {
              return true;
            }
            board[row][col] = 0;
            await drawBoard(board);
          }
        }
        return false;
      }
  
      function isSafe(row, col) {
        for (let i = 0; i < row; i++) {
          if (board[i][col] === 1) {
            return false;
          }
          if (col - (row - i) >= 0 && board[i][col - (row - i)] === 1) {
            return false;
          }
          if (col + (row - i) < n && board[i][col + (row - i)] === 1) {
            return false;
          }
        }
        return true;
      }
  
      async function drawBoard(board) {
        chessboard.innerHTML = "";
        chessboard.style.setProperty("--size", n);
        for (let row = 0; row < n; row++) {
          for (let col = 0; col < n; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            if (board[row][col] === 1) {
              cell.classList.add("queen");
            }
            chessboard.appendChild(cell);
          }
        }
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }
  });
  