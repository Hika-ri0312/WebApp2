import tabula
import pandas as pd
#csvファイルの修正
# Creating an empty Dataframe with column names only
df_clean = pd.read_csv('./sample.csv', names=['year','month1','day1','week_day','month2','day2','content'])


df_clean['month_day1'] = df_clean['month1']+df_clean['day1']
df_clean['month_day2'] = df_clean['month2']+df_clean['day2']


#変換したデータをcsvに上書き
df_clean.to_csv('./sample.csv',columns=['year','month_day1','month_day2','content'])