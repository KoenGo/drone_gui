#!/bin/bash
export FLASK_APP=gui.py
if $(ps aux | grep -q "python gen_t\.py"); then
    echo "gen_t already running"
else
    python gen_t.py &
fi
flask run
