# WebApp2

## How to use?

``` docker-compose.yml ``` ファイルがあるディレクトリで``` docker-compose up -d ``` と入力してください。

## Notes

ポート番号は10180番ポートです。  
reactのファイルを変更した場合は以下のコマンドを実行してください。  

- ``` docker-compose exec react_app bash -c "cd react-app/ && yarn run build" ```
