const sqft = document.getElementById('sqft');
const insulation = document.getElementById('insulation');
const windows = document.getElementById('windows');
const climate = document.getElementById('climate');

function update() {
    console.log({
        sqft: sqft.value,
        insulation: insulation.value,
        windows: windows.value,
        cliamte: climate.value,
    });
}

sqft.addEventListener('input', update);
insulation.addEventListener('change', update);
windows.addEventListener('input', update);
climate.addEventListener('change', update);

update();