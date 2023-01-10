from bs4 import BeautifulSoup
import requests
import time
import json

SERVER_URL = 'http://localhost:5000/updateData'


def getData():
    url = "http://192.168.106.237/"
    url2 = "http://192.168.106.237/id"
    r = requests.get(url)
    r2 = requests.get(url2)
    ide = r2.text
    data = r.text
    soup = BeautifulSoup(data, "html.parser")
    temp = soup.find("span", id="temperature")
    hum = soup.find("span", id="humidity")
    # ide = soup.find("span",id="id")
    return {'temp': temp.text, 'hum': hum.text, 'deviceID': ide}


while (1):
    data = getData()
    print(data)
    res = requests.post(url=SERVER_URL, json=data)
    # print(res)
    time.sleep(15)
