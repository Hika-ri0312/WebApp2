from bs4 import BeautifulSoup
import requests
import re

target_urls = []

def schedule_calendar():
    links = ["https://rais.skr.u-ryukyu.ac.jp/dc/?page_id=5851"]
    for link in range(len(links)):
        r= requests.get(links[link])
        soup = BeautifulSoup(r.content, 'html.parser')
        elems = soup.find_all("li")
        for i in elems:
            if "年度　学年暦" in str(i):
                urls = re.findall(r'href="(.*?)"', str(i))[0]
                urls = "https://rais.skr.u-ryukyu.ac.jp/" + urls.replace("../","")
                break
        target_urls.append(urls)

def class_time():
    links = ["https://rais.skr.u-ryukyu.ac.jp/dc/?page_id=1281"]
    for link in range(len(links)):
        r= requests.get(links[link])
        soup = BeautifulSoup(r.content, 'html.parser')
        elems = soup.find_all("a")
        urls = []
        for i in elems:
            if "前学期" in str(i):
                result = re.findall(r'href="(.*?)"', str(i))[0]
                result = "https://rais.skr.u-ryukyu.ac.jp/" + result.replace("../","")
                urls.append(result)
                break
        for i in elems:
            if "後学期" in str(i):
                result = re.findall(r'href="(.*?)"', str(i))[0]
                result = "https://rais.skr.u-ryukyu.ac.jp/" + result.replace("../","")
                urls.append(result)
                break
    for i in range(len(urls)):
        r= requests.get(urls[i])
        soup = BeautifulSoup(r.content, 'html.parser')
        elems = soup.find_all("a")
        for i in elems:
            if "知能情報コース" in str(i):
                result = re.findall(r'href="(.*?)"', str(i))[0]
                result = "https://rais.skr.u-ryukyu.ac.jp/" + result.replace("../","")
                target_urls.append(result)
                break

def write_urls():
    with open("/root/src/modules/text/urls.txt",mode="w") as f:
        f.write(str(target_urls))

def scraping():
    schedule_calendar()
    class_time()
    write_urls()

def main():
    schedule_calendar()
    class_time()
    write_urls()

if __name__=="__main__":
    main()
