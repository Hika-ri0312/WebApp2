from flask import Flask, request, jsonify
import modules.judge_spacy  as jus
import modules.mysql_conn as mysql
import modules.get_rank as rank

app = Flask(__name__)

# 日本語を使えるように
app.config['JSON_AS_ASCII'] = False

@app.route('/pyapi/', methods=['POST'])
def post_json():
    reqJson = request.get_json()["title"]
    resMes, source= jus.cos_distance(reqJson) 
    ref = {
        "title":resMes[0],
        "source":source[0],
        "title1":resMes[1],
        "source1":source[1],
        "title2":resMes[2],
        "source2":source[2],
        "title3":resMes[3],
        "source3":source[3],
    }
    return jsonify(ref)

@app.route('/pyapi/calendar/update/', methods=['POST'])
def cal_update():
    reqJson = request.get_json()
    mysql.mysqlUpdate(reqJson)
    print(reqJson)
    ref = {
        "res":"ok",
    }
    return jsonify(ref)

@app.route('/pyapi/calendar/push/', methods=['POST'])
def cal_push():
    reqJson = request.get_json()
    mysql.mysqlPush(reqJson)
    print(reqJson)
    ref = {
        "res":"ok",
    }
    return jsonify(ref)

@app.route('/pyapi/calendar/delete/', methods=['POST'])
def cal_delete():
    reqJson = request.get_json()
    mysql.mysqlDel(reqJson)
    print(reqJson)
    ref = {
        "res":"ok",
    }
    return jsonify(ref)

@app.route('/pyapi/calendar/get/',methods=['POST'])
def get_json():
    reqJson = request.get_json()
    print(reqJson)
    return jsonify(mysql.mysqlList(reqJson))

@app.route('/pyapi/rank_table/get/',methods=['GET'])
def get_rank():
    ranking = rank.get_rank() 
    ref = {
        "res1":ranking[0],
        "res2":ranking[1],
        "res3":ranking[2],
        "res4":ranking[3],
        "res5":ranking[4],
    }
    return jsonify(ref)
if __name__ == '__main__':
    app.run()
