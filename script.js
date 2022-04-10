const DEFAULT_SIZE = 16;

const grid = document.querySelector('#grid');
const btnClear = document.querySelector('#btn-clear');

function createGrid(gridSize) {
    grid.replaceChildren();
    grid.style.gridTemplate = `repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`;

    let gridSquares = gridSize ** 2;
    while (gridSquares) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        grid.appendChild(gridItem);
        gridSquares--;
    }
    activateGrid();
}

function activateGrid() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(gridItem => {
        gridItem.addEventListener('mousedown', fillSquare);
        gridItem.addEventListener('mouseenter', fillSquare);
    });
}

function fillSquare(event) {
    if (event.buttons != 1) return;

    event.target.style.backgroundColor = 'steelblue';
}

function clearGrid() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(gridItem => {
        gridItem.style.backgroundColor = '';
    });
}

btnClear.addEventListener('click', clearGrid);

let gridSize = DEFAULT_SIZE;
createGrid(gridSize);
