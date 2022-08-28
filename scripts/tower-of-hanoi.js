let stackSize = 7;

let origen = [];
let destiny = [];
let intermediary = [];

let states = [];
let frameRate = 1;

let idSetInterval = 0;

function start() {
    clearInterval(idSetInterval);

    stackSize = document.getElementById('input-blocks').value;
    frameRate = document.getElementById('input-frame-rate').value;

    validate(stackSize, frameRate);

    inializateStacks(stackSize);

    saveState();
    solveProblem(stackSize, origen, destiny, intermediary);
    animate();
}


function validate(stackSize, frameRate) {
    if (stackSize > 15) {
        document.getElementById('input-blocks').value = 15;
        stackSize = 15;
    }

    if (frameRate <= 0) {
        document.getElementById('input-frame-rate').value = 1;
        frameRate = 1;
    }
}

function inializateStacks(quantity) {
    origen = [];
    destiny = [];
    intermediary = [];

    states = [];

    for (let i = quantity; i > 0; i--) {
        origen.push(i);
    }
}

function solveProblem(n, _origen, _destiny, _intermediary) {
    let block;

    if (n == 1) {
        block = _origen.pop();
        _destiny.push(block);
        saveState()
    } else {
        solveProblem(n - 1, _origen, _intermediary, _destiny);
        solveProblem(1, _origen, _destiny, _intermediary);
        solveProblem(n - 1, _intermediary, _destiny, _origen);
    }
}

function saveState() {
    states.push([copyArray(origen), copyArray(destiny), copyArray(intermediary)]);
}

function copyArray(array) {
    return array.slice();
}

function animate() {
    let canvas = document.getElementById("animation");
    let count = 0;

    idSetInterval = setInterval(() => {
        let tower = createTower(states[count]);
        canvas.innerHTML = tower.outerHTML;
        count++;

        if (count == states.length) {
            clearInterval(idSetInterval);
        }
    }, 1000 / frameRate)
}

function createTower(state) {
    let frame = document.createElement('div');
    let base = document.createElement('div');

    frame.setAttribute('class', 'tower')
    base.setAttribute('class', 'tower__base');

    frame.appendChild(base);

    for (let column of state) {
        let coluna = createColumn(column);
        frame.appendChild(coluna);
    }

    return frame
}

function createColumn(columnArray) {
    let column = document.createElement('div');
    let pin = document.createElement('div');

    pin.setAttribute('class', 'tower__pin');
    column.setAttribute('class', 'tower__column');
    column.appendChild(pin);

    for (let blockValue of columnArray) {
        let block = createBlock(blockValue);
        column.appendChild(block);
    }

    let emptyBlocks = stackSize - column.length;

    for (let i = 0; i < emptyBlocks; i++) {
        let bloco = createBlock(0);
        column.appendChild(bloco);
    }

    return column
}

function createBlock(size) {
    let block = document.createElement('div');

    block.setAttribute('class', 'tower__block');
    let border = (200 * size / stackSize);
    
    block.style = `width: ${border}px;`

    return block;
}
