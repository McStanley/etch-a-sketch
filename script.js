const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#4682b4';

const grid = document.querySelector('#grid');
const colorPicker = document.querySelector('#color-picker');
const btnDraw = document.querySelector('#btn-draw');
const btnErase = document.querySelector('#btn-erase');
const btnClear = document.querySelector('#btn-clear');
const sizeSlider = document.querySelector('#size-slider');
const sizeSliderOutput = document.querySelector('#size-slider-output');

function updateColor() {
    currentColor = colorPicker.value;
    activateDraw();
}

function updateSize() {
    sizeSliderOutput.textContent = sizeSlider.value;

    gridSize = sizeSlider.value;
    createGrid();
}

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

colorPicker.addEventListener('input', updateColor);
btnDraw.addEventListener('click', activateDraw);
btnErase.addEventListener('click', activateErase);
btnClear.addEventListener('click', createGrid);
sizeSlider.addEventListener('input', updateSize);

let currentColor = DEFAULT_COLOR;
colorPicker.setAttribute('value', currentColor);

let gridSize = DEFAULT_SIZE;
sizeSlider.setAttribute('value', gridSize);
sizeSliderOutput.textContent = gridSize;
createGrid();
