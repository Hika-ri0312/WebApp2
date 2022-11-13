import tabula
import pandas as pd
import numpy as np
import csv

#PDFファイルパス
 
def read_pdf():
    dfs = tabula.read_pdf("./text/gakunennreki/pdf/gakunennreki.pdf", stream=True,pages="all")
    return dfs
    #CSVへ出力
        
def preprocess_text():
    df_clean = pd.read_csv("./text/csv/gakunennreki.csv", names=['year','month1','day1','week_day','month2','day2','content'])
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

def pdf2csv():
    dfs = read_pdf()
    for df in dfs:
        df.to_csv("./text/csv/gakunennreki.csv", index=None)    
    df_clean = preprocess_text()
    #変換したデータをcsvに上書き
    df_clean.to_csv("./text/csv/gakunennreki.csv",columns=['content','month_day1'])
 
def main():
    dfs = read_pdf()
    #print(dfs[0])
    df_clean = preprocess_text()
    #print(df_clean)
    
if __name__=="__main__":
#    main()
    pdf2csv()
