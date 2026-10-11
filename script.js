const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

function applyTheme(theme) {
    root.dataset.theme = theme
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙'
}

function initTheme() {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') {
        applyTheme(saved)
        return
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme:dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
}

themeToggle.addEventListener('click', () => {
    const next  = root.dataset.theme === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    localStorage.setItem('theme', next)
})

initTheme();

const sqft = document.getElementById('sqft');
const insulation = document.getElementById('insulation');
const windows = document.getElementById('windows');
const climate = document.getElementById('climate');

const tonsOut = document.getElementById('tons');
const costOut = document.getElementById('cost');

const BASE_BTU_PER_SQFT = 25;

const INSULATION_FACTOR = {poor: 1.3, average: 1.0, good: 0.8};

const BTU_PER_WINDOW = 1000;

const CLIMATE_FACTOR = {toronto: 1.0};

const BTU_PER_TON = 12000;

const COST_PER_TON = {
    poor:    {low: 4500, high: 6500},
    average: {low: 4000, high: 5500},
    good:    {low: 3500, high: 5000}
}

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

function calculateCost(tons) {
    const band = COST_PER_TON[insulation.value];
    const low = Math.round((tons * band.low) / 100) * 100;
    const high = Math.round((tons * band.high) / 100) * 100;
    return {low, high}
}

function update() {
    const tons = calculateTons();
    const cost = calculateCost(tons);

    tonsOut.textContent = tons;
    costOut.textContent = `$${cost.low.toLocaleString()} – $${cost.high.toLocaleString()} CAD`;
}

sqft.addEventListener('input', update);
insulation.addEventListener('change', update);
windows.addEventListener('input', update);
climate.addEventListener('change', update);

update();