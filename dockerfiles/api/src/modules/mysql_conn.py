import MySQLdb
import csv
import pandas as pd
from flask import abort


connection = MySQLdb.connect(
    host='mysql',
    user='user',
    passwd='passw0rd',
    db='qbo',
    charset='utf8')
cursor = connection.cursor()

cursor.execute("""CREATE TABLE IF NOT EXISTS users(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    name TEXT NOT NULL, 
    password CHAR(255) NOT NULL
    )""")
cursor.execute("""CREATE TABLE IF NOT EXISTS qbo.schedule(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title TEXT NOT NULL,
    day CHAR(255) NOT NULL,
    dayId CHAR(255) NOT NULL,
    uid CHAR(255) NOT NULL,
    dayTime TEXT NOT NULL,
    source TEXT NOT NULL
    )""")
query = 'SELECT title,dayTime,source FROM schedule'
data_list = []
cursor.execute(query)
for (title,dayTime,source) in cursor:
    data_list.append([title,dayTime,source])
df = pd.DataFrame( data_list ,columns=['question','answer','source'])
df.to_csv("./modules/text/csv/schedule.csv", index=None)   
connection.commit()
connection.close()

def mysqlInit():
    connection = MySQLdb.connect(
        host='mysql',
        user='user',
        passwd='passw0rd',
        db='qbo',
        charset='utf8')
    cursor = connection.cursor()
    return cursor,connection

def mysqlUpdate(content):
    cursor,connection = mysqlInit()
    pass

def mysqlList(content):
    returnDict = {}
    returnDict["cont"] = []
    cursor,connection = mysqlInit()
    print(content)
    if(not(any(content))):
        #returnDict["cont"].append({"title":"bad","day":"","id":"","uid":"","dayTime":""})
        return { 'message': 'Unknown code' }, 400
    uid = content["uid"]
    print(uid)
    cursor.execute("select title,day,dayId,uid,dayTime from schedule where uid = %s",[uid])
    print(cursor)
    for ind,(title, day, dayId,uid,dayTime) in enumerate(cursor):
        returnDict["cont"].append({"title":title,"day":int(day),"id":int(dayId),"uid":uid,"dayTime":dayTime})
    print(returnDict)
    return returnDict

def mysqlUpdate(content):
    cursor,connection = mysqlInit()
    title   = content["title"] 
    titleId = content["id"] 
    dayId   = content["day"] 
    uid   = content["uid"] 
    dayTime   = content["dayTime"] 
    cursor.execute("UPDATE schedule set title = %s where day = %s and dayId = %s and uid = %s and dayTime = %s",(title,dayId,titleId,uid,dayTime))
    data_list = []
    query = 'SELECT title,dayTime,source FROM schedule'
    cursor.execute(query)
    for (title,dayTime,source) in cursor:
        data_list.append([title,dayTime,source])
    df = pd.DataFrame( data_list ,columns=['question','answer','source'])
    df.to_csv("./modules/text/csv/schedule.csv", index=None)   
    connection.commit()
    connection.close()

def mysqlPush(content):
    cursor,connection = mysqlInit()
    title   = content["title"] 
    titleId = content["id"] 
    dayId   = content["day"] 
    uid   = content["uid"] 
    dayTime   = content["dayTime"] 
    source = "user1" + "さん"
    cursor.execute("INSERT INTO schedule VALUES (0,%s,%s,%s,%s,%s,%s)",(title,dayId,titleId,uid,dayTime,source))
    query = 'SELECT title,dayTime,source FROM schedule'
    cursor.execute(query)
    data_list = []
    for (title,dayTime,source) in cursor:
        data_list.append([title,dayTime,source])
    df = pd.DataFrame( data_list ,columns=['question','answer','source'])
    df.to_csv("./modules/text/csv/schedule.csv", index=None)   
    connection.commit()
    connection.close()

def mysqlDel(content):
    cursor,connection = mysqlInit()
    title   = content["title"] 
    titleId = content["id"] 
    dayId   = content["day"] 
    uid   = content["uid"] 
    dayTime   = content["dayTime"] 
    cursor.execute("DELETE FROM schedule WHERE title = %s and day = %s and dayId = %s and uid = %s and dayTime = %s",(title,dayId,titleId,uid,dayTime))
    query = 'SELECT title,dayTime,source FROM schedule'
    cursor.execute(query)
    data_list = []
    for (title,dayTime,source) in cursor:
        data_list.append([title,dayTime,source])
    df = pd.DataFrame( data_list ,columns=['question','answer','source'])
    df.to_csv("./modules/text/csv/schedule.csv", index=None)   
    connection.commit()
    connection.close()

def main():
    cursor.execute("show databases")
    connection.close()

if __name__=="__main__":
    main()
