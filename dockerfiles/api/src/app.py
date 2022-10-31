from flask import Flask, request, jsonify

app = Flask(__name__)

# 日本語を使えるように
app.config['JSON_AS_ASCII'] = False

@app.route('/',methods=['GET'])
def get_json():
    return {
        "title":"準備中です。自分で調べやがれ下さい。",
    }

#@app.route('/', methods=['POST'])
#def post_json():
#    json = request.get_json() 
#    print(json)
#    return {
#    ref = {
#        "title":"See you!",
#    }
#    return jsonify(ref)

if __name__ == '__main__':
    app.run()
