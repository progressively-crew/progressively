# compose_flask/app.py
from flask import Flask, render_template
from redis import Redis

app = Flask(__name__, template_folder='front')
redis = Redis(host='redis', port=6379)

@app.route('/')
def hello():
    return render_template("index.html", my_string="Wheeeee!")


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)