let SIZE = 9;

function startGame() {
    const gridSize = document.getElementById('grid-size').value;
    SIZE = parseInt(gridSize);
    
    createSudokuGrid();
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('game-page').style.display = 'block';
}

function createSudokuGrid() {
    const gridContainer = document.getElementById('sudoku-grid');
    gridContainer.innerHTML = '';  // Clear any existing grid
    
    // Set the grid template based on the size
    gridContainer.style.gridTemplateColumns = `repeat(${SIZE}, 1fr)`;
    
    for (let i = 0; i < SIZE * SIZE; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.min = '0';
        input.max = SIZE.toString();
        input.value = '0';
        gridContainer.appendChild(input);
    }
}

function solveSudoku() {
    const inputs = document.querySelectorAll('#sudoku-grid input');
    const grid = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));

    inputs.forEach((input, index) => {
        const row = Math.floor(index / SIZE);
        const col = index % SIZE;
        grid[row][col] = parseInt(input.value, 10);
    });

    if (solve(grid, 0, 0)) {
        inputs.forEach((input, index) => {
            const row = Math.floor(index / SIZE);
            const col = index % SIZE;
            input.value = grid[row][col];
        });
        document.getElementById('message').textContent = 'Solved Sudoku:';
        document.getElementById('message').style.color = '#4caf50';
    } else {
        document.getElementById('message').textContent = 'No solution exists';
        document.getElementById('message').style.color = '#d9534f';
    }
}

function isSafe(grid, row, col, num) {
    for (let x = 0; x < SIZE; x++) {
        if (grid[row][x] === num || grid[x][col] === num) {
            return false;
        }
    }

    const subGridSize = Math.sqrt(SIZE);
    const startRow = row - row % subGridSize;
    const startCol = col - col % subGridSize;
    for (let i = 0; i < subGridSize; i++) {
        for (let j = 0; j < subGridSize; j++) {
            if (grid[i + startRow][j + startCol] === num) {
                return false;
            }
        }
    }

    return true;
}

function solve(grid, row, col) {
    if (row === SIZE - 1 && col === SIZE) {
        return true;
    }

    if (col === SIZE) {
        row++;
        col = 0;
    }

    if (grid[row][col] !== 0) {
        return solve(grid, row, col + 1);
    }

    for (let num = 1; num <= SIZE; num++) {
        if (isSafe(grid, row, col, num)) {
            grid[row][col] = num;
            if (solve(grid, row, col + 1)) {
                return true;
            }
        }
        grid[row][col] = 0;
    }

    return false;
}
