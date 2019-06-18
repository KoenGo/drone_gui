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
    }
}