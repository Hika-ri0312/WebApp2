from flask import Flask, request, jsonify

app = Flask(__name__)

# 日本語を使えるように
app.config['JSON_AS_ASCII'] = False

@app.route('/',methods=['GET'])
def get_json():
    return {
        "title":"準備中です。自分で調べやがれ下さい。",
    }

@app.route('/', methods=['POST'])
def post_json():
    reqJson = request.get_json()["title"] 
    if "夏休み" in reqJson:
        resMes = "明日からです(大嘘)。"
    elif "第3クォーター" in reqJson:
        resMes = "すでに始まっています。"
    elif "彼女" in reqJson:
        resMes = "...来世に期待しましょう。"
    else:
        resMes = "準備中です。自分で調べやがれ下さい。"
    ref = {
        "title":resMes,
    }
    return jsonify(ref)

if __name__ == '__main__':
    app.run()
