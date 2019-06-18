let req = new XMLHttpRequest();

req.onreadystatechange = function () {
    if (req.readyState === 4 && req.status === 200) {
        let data = req.responseText;
        processData(data);
        console.timeEnd("poll file");
    }
};

function getData() {
    console.time("poll file");
    req.open("GET", "/data", true);
    req.send();
}

let time_ms = 0;

let plot_data_buffer = {angle: [],
                        gyro: [],
                        motors: []};



function processData(data) {
    let split_data = data.split(/\s+/);
    let angle_lr = split_data.slice(6, 8);
    let gyro_rpy = split_data.slice(15, 18);
    let motors = split_data.slice(23, 27);
    plot_data_buffer.angle.push(angle_lr);
    plot_data_buffer.gyro.push(gyro_rpy);
    plot_data_buffer.motors.push(motors);
    time_ms += 10;
    updateMotorGauges(motors);
}

function updateMotorGauges(arr) {
    arr.forEach(function (val, i) {
        document.getElementById('val_motor' + (i + 1)).innerText = val;
        gauges[i].set(val);
    });
}