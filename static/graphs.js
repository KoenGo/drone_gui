function initGraphs() {
    gyro_chart.data = {
        datasets: [{
            label: 'Roll',
            fill: false,
            borderColor: 'rgb(244, 65, 89)',
            data: []
        }, {
            label: 'Pitch',
            fill: false,
            borderColor: 'rgb(65, 244, 73)',
            data: []
        }, {
            label: 'Yaw',
            fill: false,
            borderColor: 'rgb(66, 134, 244)',
            data: []
        }]
    };

    angle_chart.data = {
        datasets: [{
            label: 'Roll',
            fill: false,
            borderColor: 'rgb(244, 65, 89)',
            data: []
        }, {
            label: 'Pitch',
            fill: false,
            borderColor: 'rgb(65, 244, 73)',
            data: []
        }]
    };

    motors_chart.data = {
        datasets: [{
            label: 'Motor 1',
            fill: false,
            borderColor: 'rgb(244, 65, 89)',
            data: []
        }, {
            label: 'Motor 2',
            fill: false,
            borderColor: 'rgb(65, 244, 73)',
            data: []
        }, {
            label: 'Motor 3',
            fill: false,
            borderColor: 'rgb(66, 134, 244)',
            data: []
        }, {
            label: 'Motor 4',
            fill: false,
            borderColor: 'rgb(241, 244, 66)',
            data: []
        }]
    };
    gyro_chart.update();
    angle_chart.update();
    motors_chart.update();
}

let plot = {
    data_buffer: {
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
    },

    pushZeroValues: function () {
        plot.data_buffer.gyro.push([0, 0, 0]);
        plot.data_buffer.angle.push([0, 0]);
        plot.data_buffer.motors.push([0, 0, 0, 0])
    }
};