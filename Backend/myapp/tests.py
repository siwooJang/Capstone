from functools import cached_property
from http.client import HTTPResponse
from django.http import HttpResponsePermanentRedirect
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
#from django.conf.global_settings import AUTH_USER_MODEL as User
from django.contrib.auth.models import User
from .models import Diary
from .serializers import DiarySerializer,DiaryDetailSerializer

class _lazystr:
    def __init__(self,callable):
        self._callback=callable
    @cached_property
    def to_str(self):
        return self._callback()
    def __str__(self) -> str:
        return self.to_str
    def __repr__(self) -> str:
        return self.to_str
class _lazyjoin:
    __slots__='args','join','_str','transform'
    def __init__(self,*args,join:str='',transform=repr):
        self.args=args
        self.join=join
        self.transform=transform
        self._str=None
    def to_str(self):
        if self._str is None:
            self._str=self.join.join((self.transform(x) for x in self.args))
        return self._str
    __str__=__repr__=to_str

fl=_lazystr
l=_lazyjoin

def _debug_render_response(resp:HTTPResponse):
    if hasattr(resp,"data"):
        return repr(resp.data)
    #if isinstance(resp,HttpResponsePermanentRedirect):
    #    return f'<HttpResponsePermanentRedirect:{resp.META=!r}'
    return repr(resp)
def _render_response(resp:HTTPResponse):
    return _lazystr(lambda:f'failed:{_debug_render_response(resp)}')

_r=_render_response


class JWTAuthorizationMixin:
    def setAuth(self:APITestCase,username:str,password:str) -> None:
        url=reverse('token_obtain_pair')
        response=self.client.post(url,{'username':username,'password':password},format='json')
        self.assertEqual(response.status_code,status.HTTP_200_OK,l('failed:',response.data))
        self.assertIn('access',response.data)
        self.assertIn('refresh',response.data)
        self.assertEqual(len(response.data),2)
        self.__access='Bearer '+response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=self.__access)
    def unAuth(self:APITestCase):
        self.client.credentials()
    def reAuth(self:APITestCase):
        self.client.credentials(HTTP_AUTHORIZATION=self.__access)

class UserAuthencateMixin(JWTAuthorizationMixin):
    def setUser(self,username:str|None=None,password:str|None=None):
        if username is None:
            username=f'test_user_{type(self).__name__}'
        if password is None:
            password=User.objects.make_random_password()
        myuser=User.objects.create_user(username=username,password=password)
        self.setAuth(username,password)
        return myuser


class UnauthTests(APITestCase):
    def test_diary_create(self):
        diary_data={'title':'a test diary for Authtest','content':"just a testing content, nothing to see here"}
        response=self.client.post('/api/diary/',diary_data,format='json')
        self.assertEqual(response.status_code,status.HTTP_403_FORBIDDEN)


class DiaryCreationTest(APITestCase,UserAuthencateMixin):
    #john_password="very_secret"

    def setUp(self) -> None:
        #self.john=User.objects.create_user(username="john",password=self.john_password)
        #self.setAuth('john',self.john_password)
        self.user=self.setUser()

    def test_diary_create(self):
        """
        """        
        diary_data={'title':'a test diary for Authtest','content':"just a testing content, nothing to see here"}
        response=self.client.post('/api/diary/',diary_data,format='json')
        self.assertEqual(response.status_code,status.HTTP_201_CREATED,l('failed:',response.data))
        self.assertIn('id',response.data)
        diary_in_db=Diary.objects.get(id=response.data['id'])
        ser=DiarySerializer(diary_in_db)
        self.assertDictEqual(ser.data,response.data)
        self.assertEqual(diary_in_db.writer,self.user)
    
    def test_diary_create_unicode(self):
        """
        """

        diary_data={'title':'a test diary for Authtest','content':
"""
testing some utf-8 issue
한글을 포함한 일기의 경우에도 DB에서 제대로 처리가 될지 확인해야 할 필요가 있습니다.
줄바꿈도 통상적이라면 제대로 처리되겠지만 혹시 모르니 확인중입니다.
"""}
        response=self.client.post('/api/diary/',diary_data,format='json')
        self.assertEqual(response.status_code,status.HTTP_201_CREATED,l('failed:',response.data))
        self.assertIn('id',response.data)
        diary_in_db=Diary.objects.get(id=response.data['id'])
        ser=DiarySerializer(diary_in_db)
        self.assertDictEqual(ser.data,response.data)
        self.assertEqual(response.data['content'],diary_data['content'].strip()) #이유는 아직 모르지만 데이터베이스에 들어갔다 나오니 양끝의 \n이 사라졌다. 나중에 찾아볼 필요는 있을 것 같다.

#def dict_to_frozenset(x:dict):
#    return frozenset(map(tuple,x.items()))
def json_to_hashable(x):
    if isinstance(x,dict):
        return frozenset((
            (k,json_to_hashable(v))for k,v in x.items()
        ))
    if isinstance(x,list):
        return tuple((json_to_hashable(i) for i in x))
    return x

class DiaryReadTest(APITestCase,UserAuthencateMixin):
    def setUp(self) -> None:
        self.user=self.setUser()
        ordinal=[
            '첫','두','세','네','다섯'
        ]
        diarys=Diary.objects.bulk_create([
            Diary(
                title=f'{ord}번째 일기',
                content=f'{ord}번째 일기의 내용이다.\n아직 긴 내용을 테스트해보지는 않았다.\n혹시 모르니 중간에 다른 부분도 넣는다.\n{ord*4}\n',
                writer=self.user,
#                emotion={}
            )
            for ord in ordinal
        ])
        self.diarys=list(Diary.objects.filter(writer=self.user).all())
        for oldiary,newdiary in zip(diarys,self.diarys):
            self.assertEqual(oldiary.title,newdiary.title)
            self.assertEqual(oldiary.content,oldiary.content)

    def test_read_one_unauthorized(self):
        self.unAuth()
        mydiary=self.diarys[0]
        response=self.client.get(f'/api/diary/{mydiary.pk}/',format='json')
        self.assertEqual(response.status_code,status.HTTP_403_FORBIDDEN,l(_r(response),' ,mydiary.pk=',mydiary.pk))
    def test_read_one_unauthorized_wierd(self):
        "/api/diary/1/ 이 아닌 /api/diary/1 을 요청했을 경우 redirection"
        self.unAuth()
        mydiary=mydiary=self.diarys[0]
        response=self.client.get(f'/api/diary/{mydiary.pk}',format='json')
        self.assertEqual(response.status_code,status.HTTP_301_MOVED_PERMANENTLY)
        self.assertEqual(response.url,f'/api/diary/{mydiary.pk}/')

    def test_read_one(self):
        self.reAuth()
        mydiary=mydiary=self.diarys[0]
        response=self.client.get(f'/api/diary/{mydiary.pk}/',format='json')
        self.assertEqual(response.status_code,status.HTTP_200_OK,_r(response))
        self.assertDictEqual(response.data,DiarySerializer(mydiary).data)

    def test_read_one_wierd(self):
        "/api/diary/1/ 이 아닌 /api/diary/1 을 요청했을 경우 redirection"
        self.reAuth()
        mydiary=mydiary=self.diarys[0]
        response=self.client.get(f'/api/diary/{mydiary.pk}',format='json')
        self.assertEqual(response.status_code,status.HTTP_301_MOVED_PERMANENTLY)
        self.assertEqual(response.url,f'/api/diary/{mydiary.pk}/')

    def test_read_many(self):
        self.reAuth()
        response=self.client.get('/api/diary/')
        self.assertEqual(response.status_code,status.HTTP_200_OK,l('failed:',response.data))
        data=response.data

        self.assertIn('results',data)
        expected_data={
            'count':len(self.diarys),
            'next':None,
            'previous':None,
        }
        noresult_data=dict(data)
        del noresult_data['results']
        self.assertDictEqual(noresult_data,expected_data)
        results=data['results']
        self.assertIsInstance(results,list)
        self.assertEqual(len(results),len(self.diarys))

        self.assertIsInstance(results[0],dict)
        expected_results=[DiarySerializer(diary).data for diary in self.diarys]
        unordered_key=lambda x:frozenset(map(json_to_hashable,x))
        self.assertSetEqual(unordered_key(results),unordered_key(expected_results))

    def test_read_many_detail(self):
        self.reAuth()
        response=self.client.get('/api/diary/detail/')
        self.assertEqual(response.status_code,status.HTTP_200_OK,l('failed:',response.data))
        data=response.data

        self.assertIn('results',data)
        expected_data={
            'count':len(self.diarys),
            'next':None,
            'previous':None,
        }
        noresult_data=dict(data)
        del noresult_data['results']
        self.assertDictEqual(noresult_data,expected_data)
        results=data['results']
        self.assertEqual(len(results),len(self.diarys))
        expected_results=[DiaryDetailSerializer(diary).data for diary in self.diarys]
        self.assertIsInstance(results,list)
        unordered_key=lambda x:frozenset(map(json_to_hashable,x))
        self.assertSetEqual(unordered_key(results),unordered_key(expected_results))
        

        


