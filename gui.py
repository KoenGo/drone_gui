from flask import Flask
from flask import render_template

app = Flask(__name__, instance_relative_config=True)


@app.route('/')
def index():
    context = dict()
    context['motor_gauges'] = [i for i in range(1, 5)]
    context['graphs'] = [{'title': 'Acceleration', 'label': 'acceleration', 'width': '90%', 'height': 'auto'},
                         {'title': 'Gyro', 'label': 'gyro', 'width': '90%', 'height': 'auto'},
                         {'title': 'Sensors', 'label': 'sensors', 'width': '90%', 'height': 'auto'}]
    return render_template('base.html', **context)


@app.route('/data')
def data_source():
    with open('dat.txt') as data:
        return data.read()
