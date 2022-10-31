# WebApp2

## How to use?

``` docker-compose.yml ``` ファイルがあるディレクトリで``` docker-compose up -d ``` と入力してください。

## Notes

- ポート番号は10280番ポートです。  
- VMとファイルを同期するには、WebApp2ディレクトリ内で以下のコマンドを使用します。  
    - ``` rsync -avh --exclude-from='exclude-file.txt' -e ssh ../WebApp2 test-vm:~/workspace/src/ ```  
- VMとファイルを同期した場合、以下のファイルを修正する必要があります。
    - 対象
        - ```dockerfiles/react/src/react-app/src/ClickSendButton.jsx ```
        - 1つ目
            - 修正前
            -  25行目 ```const baseURL = "http://localhost:10180";```
            - 修正後
            -  25行目 ```//const baseURL = "http://localhost:10180";```
        - 2つ目
            - 修正前
            -  26行目 ```//const baseURL = "http://10.0.4.82:10180";```
            - 修正後
            -  26行目 ```const baseURL = "http://10.0.4.82:10180";```
    - 対象
        - ```dockerfiles/nginx/nginx.conf```
        - 1つ目
            - 修正前
                - ```20行目 ```add_header Access-Control-Allow-Origin http://localhost:10280;```
            - 修正後
                - ```20行目 ```#add_header Access-Control-Allow-Origin http://localhost:10280;```
        - 2つ目
            - 修正前
                - ```21行目 ```#add_header Access-Control-Allow-Origin http://10.0.4.82:10280;```
            - 修正後
                - ```21行目 ```add_header Access-Control-Allow-Origin http://10.0.4.82:10280;```

