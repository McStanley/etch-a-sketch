const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = 'steelblue';

const grid = document.querySelector('#grid');
const btnDraw = document.querySelector('#btn-draw');
const btnErase = document.querySelector('#btn-erase');
const btnClear = document.querySelector('#btn-clear');

function activateDraw() {
    btnErase.classList.remove('btn-active');
    btnDraw.classList.add('btn-active');
}

function activateErase() {
    btnDraw.classList.remove('btn-active');
    btnErase.classList.add('btn-active');
}

function createGrid() {
    grid.replaceChildren();
    grid.style.gridTemplate = `repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`;

    let gridSquares = gridSize ** 2;
    while (gridSquares) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        grid.appendChild(gridItem);
        gridSquares--;
    }
    activateDraw();
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

    if (btnDraw.classList.contains('btn-active')) {
        event.target.style.backgroundColor = currentColor;
    } else {
        event.target.style.backgroundColor = '';
    }
}

btnDraw.addEventListener('click', activateDraw);
btnErase.addEventListener('click', activateErase);
btnClear.addEventListener('click', createGrid);

let gridSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;
createGrid();
