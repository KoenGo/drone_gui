let gauges = [];

let opts = {
    angle: -0.20, // The span of the gauge arc
    lineWidth: 0.2, // The line thickness
    radiusScale: 1, // Relative radius
    pointer: {
        length: 0.6, // Relative to gauge radius
        strokeWidth: 0.035, // The thickness
        color: '#000000' // Fill color
    },
    limitMax: true,     // If false, max value increases automatically if value > maxValue
    limitMin: true,     // If true, the min value of the gauge will be fixed
    generateGradient: false,
    // percentColors: [[0.0, "#32e20b"], [0.75, "#f9c802"], [1.0, "#ff0000"]],
    highDpiSupport: true,     // High resolution support
    staticZones: [
        {strokeStyle: "#E0E0E0", min: 0, max: 200},
        {strokeStyle: "#2dce25", min: 200, max: 650},
        {strokeStyle: "#FFDD00", min: 550, max: 650}, // Yellow
        {strokeStyle: "#F03E3E", min: 650, max: 750}  // Red
    ],
    staticLabels: {
        font: "14px sans-serif",  // Specifies font
        labels: [0, 750],  // Print labels at these values
        color: "#000000",  // Optional: Label text color
        fractionDigits: 0  // Optional: Numerical precision. 0=round off.
    },

};
for (let i = 1; i < 5; i++) {
    let target = document.getElementById('gauge_motor' + i);
    let gauge = new Gauge(target).setOptions(opts);
    gauge.maxValue = 750;
    gauge.setMinValue(0);
    gauge.animationSpeed = 32;
    gauge.set(0);
    gauges.push(gauge);
}