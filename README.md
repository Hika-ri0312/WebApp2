# WebApp2

## How to use?

- ``` docker-compose.yml ``` ファイルがあるディレクトリで以下の操作を行なってください。  
    - ``` 
        docker-compose build
        docker-compose up -d 
      ``` 
## Notes

- ポート番号は10280番ポートです。  
- ユーザ自身の環境で動かす場合は、``` docker-compose.yml ``` ファイルがあるディレクトリにある```.env```ファイルを以下のように変更してください。
    - ```
        IP_ADDR=自分環境のIPアドレス
      ```
- VMとファイルを同期するには、WebApp2ディレクトリ内で以下のコマンドを使用します。  
    - ``` rsync -avh --exclude-from='exclude-file.txt' -e ssh ../WebApp2 test-vm:~/workspace/src/ ```  

