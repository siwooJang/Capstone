from django.conf import settings
import json

import http.client

def send_diary(diary:int,content:str):
    data={'diary':diary,'content':content}
    con=http.client.HTTPConnection(settings.AI_HOST,settings.AI_PORT)
    con.request('POST','/receive',
                     headers={'Content-Type':'application/json'},
                     body=json.dumps(data)
                     )
    resp=con.getresponse()
    if resp.status!=200:
        raise Exception(f'could not request emotion analyzation with status:{resp.status}')