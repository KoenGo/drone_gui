from flask import Flask
from flask import render_template

app = Flask(__name__, instance_relative_config=True)


@app.route('/')
def index():
    context = dict()
    context['motor_gauges'] = [i for i in range(1, 5)]
    context['graphs'] = [{'title': 'Gyro', 'label': 'gyro'},
                         {'title': 'Angle', 'label': 'angle'},
                         {'title': 'Motors', 'label': 'motors'}]
    return render_template('base.html', **context)


@app.route('/data')
def data_source():
    with open('dat.txt') as data:
        return data.read()
