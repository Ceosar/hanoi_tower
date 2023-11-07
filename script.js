let selectedTower = null;
let selectedDisk = null;
const towers = [[4, 3, 2, 1], [], []];

var messageText = document.getElementsByClassName('message')[0];

function selectTower(towerNumber) {
    messageText.textContent = "";
    if (selectedTower === null) {
        selectedTower = towerNumber;
        const tower = towers[selectedTower - 1];
        if (tower.length > 0) {
            selectedDisk = tower[tower.length - 1];
            tower.pop();
            updateTowers();
            messageText.textContent = `Вы взяли диск №${selectedDisk}`
        }
        else{
            selectedTower = null;
        }
    } else {
        if (selectedDisk !== null) {
        const tower = towers[towerNumber - 1];
        if (tower.length === 0 || tower[tower.length - 1] > selectedDisk) {
            tower.push(selectedDisk);
        } else {
            messageText.textContent = "Невозможно поставить диск."
            towers[selectedTower - 1].push(selectedDisk);
        }
        selectedTower = null;
        selectedDisk = null;
        updateTowers();
        }
    }
}

function moveDisk(diskNumber) {
    if (selectedTower === null || selectedDisk !== diskNumber) {
        return;
    }

    const destinationTower = towers[selectedTower - 1];
    const destinationDisk = destinationTower[destinationTower.length - 1];

    if (destinationDisk && selectedDisk > destinationDisk) {
        return;
    }

    destinationTower.push(selectedDisk);
    selectedTower = null;
    selectedDisk = null;
    updateTowers();
}

function updateTowers() {
    for (let i = 1; i <= 3; i++) {
        const tower = document.getElementById(`tower${i}`);
        tower.innerHTML = "";
        for (let j = 0; j < towers[i - 1].length; j++) {
        const disk = document.createElement("div");
        disk.className = "disk";
        disk.style.width = 30 + towers[i - 1][j] * 20 + "px";
        disk.textContent = towers[i - 1][j];
        tower.appendChild(disk);
        }
    }
}

updateTowers();
