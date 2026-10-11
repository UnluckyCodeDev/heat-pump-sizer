const sqft = document.getElementById('sqft');
const insulation = document.getElementById('insulation');
const windows = document.getElementById('windows');
const climate = document.getElementById('climate');

const tonsOut = document.getElementById('tons')
const costOut = document.getElementById('cost');

const BASE_BTU_PER_SQFT = 25;

const INSULATION_FACTOR = {poor: 1.3, average: 1.0, good: 0.8};

const BTU_PER_WINDOW = 1000;

const CLIMATE_FACTOR = {toronto: 1.0};

const BTU_PER_TON = 12000;

function calculateTons() {
    const sqftValue = Number(sqft.value) || 0;
    const windowsValue = Number(windows.value) || 0;

    let btu = sqftValue * BASE_BTU_PER_SQFT;
    btu *= INSULATION_FACTOR[insulation.value];
    btu += windowsValue * BTU_PER_WINDOW;
    btu *= CLIMATE_FACTOR[climate.value];

    const tons = btu / BTU_PER_TON;

    const rounded = Math.round(tons * 2) / 2;
    return rounded;
}

function update() {
    // console.log({
    //     sqft: sqft.value,
    //     insulation: insulation.value,
    //     windows: windows.value,
    //     cliamte: climate.value,
    // });

    const tons = calculateTons();
    tonsOut.textContent = tons;
    costOut.textContent = '—';
}

sqft.addEventListener('input', update);
insulation.addEventListener('change', update);
windows.addEventListener('input', update);
climate.addEventListener('change', update);

update();