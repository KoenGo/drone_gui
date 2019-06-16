let req = new XMLHttpRequest();
// if (req.channel instanceof Components.interfaces.nsISupportsPriority) {
//     req.channel.priority = Components.interfaces.nsISupportsPriority.PRIORITY_HIGHEST;
// }
req.onreadystatechange = function () {
    if (req.readyState === 4 && req.status === 200) {
        let data = req.responseText;
        processData(data);
        console.timeEnd("gag");

    }
};


function getData() {
    console.time("gag");
    req.open("GET", "/data", true);
    req.send();
}

function processData(data) {
    let motordata = data.split(',');
    updateMotorGauges(motordata);
}

function updateMotorGauges(arr) {
    arr.forEach(function (val, i) {
        document.getElementById('val_motor' + (i + 1)).innerText = val;
        gauges[i].set(val);
    });
}