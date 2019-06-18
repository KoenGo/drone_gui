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

let plot = {
    data_buffer: {
        time: [],
        angle: [],
        gyro: [],
        motors: [],
    },

    gyroRefresh: function (chart) {
        console.log('refreshing gyro data');
        let a1 = [];
        let a2 = [];
        let a3 = [];
        console.log('gyro buffer: ' + plot.data_buffer.gyro);
        plot.data_buffer.gyro.forEach(function (gyro_dat) {
                a1.push(gyro_dat[0]);
                a2.push(gyro_dat[1]);
                a3.push(gyro_dat[2])
            }
        );
        for (let i = 0; i < a1.length; i++) {
            chart.data.datasets[0].data.push({x: Date.now(), y: a1[i]});
            chart.data.datasets[1].data.push({x: Date.now(), y: a2[i]});
            chart.data.datasets[2].data.push({x: Date.now(), y: a3[i]});
        }
        plot.data_buffer.gyro = [];
    },

    angleRefresh: function (chart) {
        console.log('refreshing angle data');
        let a1 = [];
        let a2 = [];
        plot.data_buffer.angle.forEach(function (angle_dat) {
                a1.push(angle_dat[0]);
                a2.push(angle_dat[1]);
            }
        );
        for (let i = 0; i < a1.length; i++) {
            chart.data.datasets[0].data.push({x: Date.now(), y: a1[i]});
            chart.data.datasets[1].data.push({x: Date.now(), y: a2[i]});
        }


        plot.data_buffer.angle = [];

    },

    motorsRefresh: function (chart) {
        let a1 = [];
        let a2 = [];
        let a3 = [];
        let a4 = [];
        plot.data_buffer.motors.forEach(function (motor_dat) {
                a1.push(motor_dat[0]);
                a2.push(motor_dat[1]);
                a3.push(motor_dat[2]);
                a4.push(motor_dat[3])
            }
        );
        for (let i = 0; i < a1.length; i++) {
            chart.data.datasets[0].data.push({x: Date.now(), y: a1[i]});
            chart.data.datasets[1].data.push({x: Date.now(), y: a2[i]});
            chart.data.datasets[2].data.push({x: Date.now(), y: a3[i]});
            chart.data.datasets[3].data.push({x: Date.now(), y: a4[i]});
        }

        plot.data_buffer.motors = [];
    }
};

let display = {
    p_values: null,
    mode: null,
    setpoints: null,
    motors: null
};

let ui = {
    updateAll: function () {
        this.updateMotors(display.motors);
        this.updateText();
    },
    updateMotors: function (arr) {
        arr.forEach(function (val, i) {
            document.getElementById('val_motor' + (i + 1)).innerText = val;
            gauges[i].set(val);
        });
    },
    updateText: function () {
        this.updateMode();
        this.updatePvalues();
    },

    updateMode: function () {
        document.getElementById('mode').innerText = modes[display.mode].name;
        document.getElementById('mode_indicator').style.backgroundColor = modes[display.mode].color;
    },

    updatePvalues: function(){
        document.getElementById('p0').innerText = display.p_values[0];
        document.getElementById('p1').innerText = display.p_values[1];
        document.getElementById('p2').innerText = display.p_values[2];
    }


};

function processData(data) {
    let split_data = data.split(/\s+/);
    console.log(split_data);
    let time = split_data[2];
    console.log('time ' + time);

    let angle_rp = split_data.slice(9, 11);
    console.log('angle_rp ' + angle_rp);

    let gyro_rpy = split_data.slice(15, 18);
    console.log('gyro_rpy ' + gyro_rpy);

    let motors = split_data.slice(21, 25);
    console.log('motors ' + motors);

    let p_values = [split_data[27], split_data[29], split_data[31]];
    console.log('p_values ' + p_values);

    let mode = split_data[4];
    console.log('mode ' + mode);

    let setpoints = split_data.slice();

    plot.data_buffer.angle.push(angle_rp);
    console.log('gyro sublist: ' + gyro_rpy);
    plot.data_buffer.gyro.push(gyro_rpy);
    console.log('full gyro list: ' + plot.data_buffer.gyro);
    console.log('full gyro list[0]: ' + plot.data_buffer.gyro[0]);

    plot.data_buffer.motors.push(motors);
    console.log('pushing time: ' + time);
    plot.data_buffer.time.push(time);

    display.p_values = p_values;
    display.mode = mode;
    display.setpoints = setpoints;
    display.motors = motors;

    ui.updateAll();
}