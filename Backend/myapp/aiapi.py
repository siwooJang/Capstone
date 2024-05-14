from django.conf import settings
import json

import http.client

def send_diary(title:str,content:str):
    data={'title':title,'content':content}
    con=http.client.HTTPConnection(settings.AI_HOST,settings.AI_PORT)
    con.request('POST','/recive',
                     headers={'Content-Type':'application/json'},
                     body=json.dumps(data)
                     )
    resp=con.getresponse()
    if resp.status!=200:
        raise Exception('could not request emotion analyzation')