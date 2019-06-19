from flask import Flask
from flask import render_template
import os

app = Flask(__name__, instance_relative_config=True)


@app.route('/')
def index():
    context = dict()
    context['motor_gauges'] = [i for i in range(1, 5)]
    context['graphs'] = [{'title': 'Gyro', 'label': 'gyro'},
                         {'title': 'Angle', 'label': 'angle'},
                         {'title': 'Motors', 'label': 'motors'}]
    return render_template('base.html', **context)


data = None


@app.route('/data')
def data_source():
    path = '/home/koen/Documents/MasterES/es-lab-2019/software_package_linux/es_lab_2019/in4073/out.txt'
    if os.path.exists(path):
        f = open(path)
        global data
        data = f.read()
        f.close()
        os.remove(path)
    return data
