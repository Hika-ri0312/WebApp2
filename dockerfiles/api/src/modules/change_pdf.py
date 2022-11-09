import tabula
import csv

#PDFファイルパス
pdfPath = './sample.pdf'
 
#PDFの読み込み
dfs = tabula.read_pdf(pdfPath, stream=True,pages="all")
 
#読み込んだPDFを確認
print(dfs[0])

 
#CSVへ出力
for df in dfs:
    df.to_csv("sample.csv", index=None)