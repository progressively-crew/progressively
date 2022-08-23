# compose_flask/app.py
#!/usr/bin/python3

import sys, array
from flask import Flask, render_template
from redis import Redis
from src.Progressively import Progressively

app = Flask(__name__, template_folder='.')
redis = Redis(host='redis', port=6379)

@app.route('/')
def hello():
    options = {"fields": {"idUser":12}}
    sdk = Progressively("99b95c4a-066e-4888-a1e5-b24f47c2df08",options)
    flags = sdk.loadFlags()
    flags["test"]
    sdk.isActivate("test")


    return render_template("index.html", flags=flags)


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True) 