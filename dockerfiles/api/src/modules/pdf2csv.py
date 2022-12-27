import tabula
import pandas as pd
import numpy as np
import csv
import pdfplumber
import requests
from bs4 import BeautifulSoup
import re

urls = ["https://rais.skr.u-ryukyu.ac.jp/wordpress/wp-content/uploads/gakunenreki/R4_gakunenreki.pdf","https://rais.skr.u-ryukyu.ac.jp/wordpress/wp-content/uploads/jikanwari/R4-1/01gakubu/07kogaku/kogaku_chino_course_1.pdf","https://rais.skr.u-ryukyu.ac.jp/wordpress/wp-content/uploads/jikanwari/R4-2/01gakubu/07kogaku/kogaku_chino_course_2.pdf"]
 
def get_pdf():
    for i in range(len(urls)):
        urlData = requests.get(urls[i]).content
        with open("./modules/text/pdf/"+str(i)+".pdf" ,mode='wb') as f:
            f.write(urlData)

def read_pdfs(file_name):
    dfs = tabula.read_pdf("./modules/text/pdf/"+file_name+".pdf", stream=True,pages="all")
    return dfs
    #CSVへ出力
        
def preprocess_text(file_name):
    df_clean = pd.read_csv("./modules/text/csv/"+file_name+".csv", names=['year','month1','day1','week_day','month2','day2','content'])
    df_clean['month_day1'] = df_clean['month1']+df_clean['day1']
    df_clean['month_day2'] = df_clean['month2']+df_clean['day2']
    del_ind = []
    for ind,is_null in enumerate(df_clean.isnull()['month_day2']):
        if not(is_null) and not("Unnamed" in df_clean['month_day2'].iloc[ind]):
            df_clean['month_day1'].iloc[ind] = df_clean['month_day1'].iloc[ind]+" ~ "+df_clean['month_day2'].iloc[ind]
        if df_clean.isnull()['content'].iloc[ind]:
            if (df_clean.isnull()['month_day1'].iloc[ind-1] and df_clean.isnull()['month_day1'].iloc[ind+1]):
                df_clean['content'].iloc[ind] = df_clean['content'].iloc[ind-1]+"\n"+df_clean['content'].iloc[ind+1]
                del_ind.append(ind+1)             
                del_ind.append(ind-1)             
            elif df_clean.isnull()['content'].iloc[ind+2]:
                df_clean['month_day1'].iloc[ind+1] = df_clean['month_day1'].iloc[ind]+" , "+df_clean['month_day1'].iloc[ind+1]+" , "+df_clean['month_day1'].iloc[ind+2]
                del_ind.append(ind+2)             
                del_ind.append(ind)             

    df_clean=df_clean.drop(df_clean.index[del_ind])
    return df_clean

def get_class_schedule(file_name):
    pdf = pdfplumber.open("./modules/text/pdf/"+file_name+".pdf")
    pages = []
    for h in range(len(pdf.pages)):
        page = pdf.pages[h]
        pages = pages + page.hyperlinks

    links = []
    for i in range(len(pages)):
        links.append(str(pages[i]["data"]["A"]["URI"])[2:-1])

    quss = []
    anss = []
    sources = []
    for link in range(len(links)):
        r= requests.get(links[link])
        soup = BeautifulSoup(r.content, 'html.parser')
        elems = soup.find_all("span")
        source = links[link]
        error = 0 
        for i in range(len(elems)):
            elems[i] = str(elems[i]).replace(re.findall(r'<span.*?>', str(elems[i]))[0],"")
            elems[i] = str(elems[i]).replace('</span>',"")
            elems[i] = elems[i].replace("\xa0","なし")
        #result = re.findall(r'<span.*span>', soup)
        try:
            elems.pop(19)
        except:
            error = 1
        if error == 0:
            elems = elems[3:27]
            elems[-1] = elems[-1].replace(","," 先生 , ")
            elems[-1] = elems[-1] + " 先生"
            elems.insert(19,elems.pop(22))
            a_lists = []
            b_lists = []
            for j in range(6):
                if (j % 2) == 0:
                    for k in range(4):
                        a_lists.append(elems[j*4+k])
                else:
                    for k in range(4):
                        b_lists.append(elems[j*4+k])
            qes = b_lists[9]
            ans = ""
            for l in range(len(a_lists)):
                ans = ans + f"{a_lists[l]}は{b_lists[l]}"
                if l != len(a_lists)-1:
                    ans = ans+"、" 
            ans = ans + "です。"
            quss.append(qes)
            anss.append(ans)
            sources.append(source)
    df = pd.DataFrame(index=None)
    df["question"] = quss 
    df["answer"] = anss
    df["source"] = sources
    #df = pd.DataFrame([quss,anss,sources],index=None,columns=['question','answer','source'])
    df.to_csv("./modules/text/csv/"+file_name+".csv",columns=['question','answer','source'])

def pdf2csv():
    #学年歴
    get_pdf()
    target = "0"
    dfs = read_pdfs(target)
    for df in dfs:
        df.to_csv("./modules/text/csv/"+target+".csv", index=None)    
    df_clean = preprocess_text(target)
    for (ind,cont) in enumerate(list(df_clean['content'])):
        df_clean['content'].iloc[ind] = cont.replace(" ","")
    #変換したデータをcsvに上書き
    df_clean.rename(columns={'content':'question'}, inplace=True)
    df_clean.rename(columns={'month_day1':'answer'}, inplace=True)
    df_clean = df_clean.assign(source=urls[int(target)])
    df_clean.to_csv("./modules/text/csv/"+target+".csv",columns=['question','answer','source'])
    #授業時間配当表
    #前期
    target = "1"
    get_class_schedule(target)
    #後期
    target = "2"
    get_class_schedule(target)
 
def main():
    dfs = read_pdfs()
    #print(dfs[0])
    df_clean = preprocess_text()
    #print(df_clean)
    
if __name__=="__main__":
#    main()
    pdf2csv()
