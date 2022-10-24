# WebApp2

## How to use?

``` docker-compose.yml ``` ファイルがあるディレクトリで``` docker-compose up -d ``` と入力してください。

## Notes

ポート番号は10180番ポートです。  
VMとファイルを同期するには、WebApp2ディレクトリ内で以下のコマンドを使用します。  
- ``` rsync -avh --exclude-from='exclude-file.txt' -e ssh ../WebApp2 test-vm:~/workspace/src/ ```  

