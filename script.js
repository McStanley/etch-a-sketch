const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#4682b4';

const grid = document.querySelector('#grid');
const colorPicker = document.querySelector('#color-picker');
const btnDraw = document.querySelector('#btn-draw');
const btnErase = document.querySelector('#btn-erase');
const btnClear = document.querySelector('#btn-clear');
const btnFullscreen = document.querySelector('#btn-fullscreen');
const sizeSlider = document.querySelector('#size-slider');
const sizeSliderOutput = document.querySelector('#size-slider-output');

let gridSize, currentColor;

function init() {
    grid.addEventListener('contextmenu', event => event.preventDefault());
    colorPicker.addEventListener('input', updateColor);
    btnDraw.addEventListener('click', activateDraw);
    btnErase.addEventListener('click', activateErase);
    btnClear.addEventListener('click', createGrid);
    btnFullscreen.addEventListener('click', toggleFullscreen);
    sizeSlider.addEventListener('input', updateGrid);

    currentColor = DEFAULT_COLOR;
    colorPicker.setAttribute('value', currentColor);

    sizeSlider.setAttribute('value', DEFAULT_SIZE);
    updateGrid();
}

function updateColor() {
    currentColor = colorPicker.value;
    activateDraw();
}

function updateGrid() {
    updateSlider();

    gridSize = sizeSlider.value;
    createGrid();
}

function updateSlider() {
    let newFontSize = 20+(sizeSlider.value/3);
    sizeSliderOutput.style.fontSize = newFontSize + 'px';
    sizeSliderOutput.textContent = `${sizeSlider.value} ✕ ${sizeSlider.value}`;
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
    // Primary button
    if (event.buttons == 1) {
        if (btnDraw.classList.contains('btn-active')) {
            event.target.style.backgroundColor = currentColor;
        } else {
            event.target.style.backgroundColor = '';
        }
    }
    //Secondary button
    if (event.buttons == 2) {
        event.target.style.backgroundColor = '';
    }
}

function toggleFullscreen(event) {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
}

init();
