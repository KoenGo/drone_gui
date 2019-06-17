from flask import Flask, url_for
from flask import render_template

app = Flask(__name__, instance_relative_config=True)


@app.route('/')
def hello_world():
    context = {}
    return render_template('index.html', context=context)


@app.route('/data')
def data_source():
    with open('dat.txt') as data:
        return data.read()
