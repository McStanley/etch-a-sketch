const grid = document.querySelector('#grid');

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
}

let gridSize = 16;

createGrid(gridSize);
