let req = new XMLHttpRequest();

req.onreadystatechange = function () {
    if (req.readyState === 4 && req.status === 200) {
        let data = req.responseText;
        processData(data);
        console.timeEnd("poll file");
    } else if (req.readyState === 4 && req.status !== 200) {
        plot.pushZeroValues();
        ui.valuesUnkown();
    }
};

function getData() {
    console.time("poll file");
    req.open("GET", "/data", true);
    req.send();
}

let display = {
    p_values: null,
    mode: null,
    setpoints: null,
    motors: null,
    battery: null,
};

let ui = {
    updateAll: function () {
        this.updateMotors();
        this.updateText();
    },
    updateMotors: function () {
        display.motors.forEach(function (val, i) {
            document.getElementById('val_motor' + (i + 1)).innerText = val;
            gauges[i].set(val);
        });
    },
    updateText: function () {
        this.updateMode();
        this.updatePvalues();
        this.updateSetpoints();
        this.updateBattery();
    },

    updateMode: function () {
        document.getElementById('mode').innerText = modes[display.mode].name;
        document.getElementById('mode_indicator').style.backgroundColor = modes[display.mode].color;
    },

    updatePvalues: function () {
        document.getElementById('p0').innerText = display.p_values[0];
        document.getElementById('p1').innerText = display.p_values[1];
        document.getElementById('p2').innerText = display.p_values[2];
    },

    updateBattery: function () {
        document.getElementById('battery').innerText = (parseInt(display.battery) / 100).toString();
    },

    updateSetpoints: function () {
        document.getElementById('setpoints').innerText = display.setpoints.join(' ');
    },

    valuesUnkown: function () {
        document.getElementById('mode').innerText = "?";
        document.getElementById('p0').innerText = "?";
        document.getElementById('p1').innerText = "?";
        document.getElementById('p2').innerText = "?";
        document.getElementById('battery').innerText = "?";
        document.getElementById('setpoints').innerText = "?";
    }
};

function processData(data) {
    let split_data = data.split(/\s+/);
    console.log(split_data);
    console.log(split_data.length);

    if (split_data.length !== 38) {
        plot.pushZeroValues();
        ui.valuesUnkown();
        return;
    }

    let time = split_data[2];
    console.log('time ' + time);

    let mode = split_data[4];
    console.log('mode ' + mode);

    let angle_rp = split_data.slice(9, 11);
    console.log('angle_rp ' + angle_rp);

    let gyro_rpy = split_data.slice(15, 18);
    console.log('gyro_rpy ' + gyro_rpy);

    let battery = split_data[19];
    console.log('battery ' + battery);

    let motors = split_data.slice(21, 25);
    console.log('motors ' + motors);

    let p_values = [split_data[27], split_data[29], split_data[31]];
    console.log('p_values ' + p_values);

    let setpoints = split_data.slice(33, 37);
    console.log('p_values ' + p_values);

    plot.data_buffer.angle.push(angle_rp);
    plot.data_buffer.gyro.push(gyro_rpy);
    plot.data_buffer.motors.push(motors);

    display.p_values = p_values;
    display.mode = mode;
    display.setpoints = setpoints;
    display.motors = motors;
    display.battery = battery;
    display.setpoints = setpoints;
    ui.updateAll();
}