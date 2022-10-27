from flask import Flask, jsonify

app = Flask(__name__)

# 日本語を使えるように
app.config['JSON_AS_ASCII'] = False

books = [{'name': 'EffectivePython', 'price': 3315}, {'name': 'Expert Python Programming', 'price': 3960}]


@app.route('/')
def get_json():
    data = {
        "id": 3,
        "name": "hoge",
        "ref": [1, 2, 4],
    }
    return jsonify(data)


if __name__ == 'main':
    app.run()