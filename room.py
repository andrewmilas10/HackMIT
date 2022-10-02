import spotipy
from spotipy.oauth2 import SpotifyOAuth
import time
from flask import request

class Room:
    def __init__(self, sp_oauth, Recs=False):
        scope = "user-modify-playback-state user-read-currently-playing user-read-playback-state"
        client_id='8f8a8980909d4e10a27e9e4e7ac702f5'
        client_secret='d42dc7c04b4e43a19c852336484304a4'
        redirect_uri='http://localhost:8888'
        self.sp_oauth = sp_oauth
        self.local_queue = []
        self.just_added = None
        self.len = 0
        self.current_song = None
        self.Recs = Recs
        self.users = 1
        self.lastKicked = False
        self.getCurrentlyPlaying()
    
    def getSp(self):
        token_info = self.sp_oauth.get_cached_token()
        access_token = token_info['access_token']
        return spotipy.Spotify(auth=access_token)

    def getCurrentlyPlaying(self):
        sp = self.getSp()
        data = sp.current_user_playing_track()
        temp = data['item']
        self.current_song = {'name':temp['name'], 'id':temp['id'], 'artist':temp['artists'][0]['name']}
        if data:
            name, artist, album_art = self.get_track_data(data['item']['id'])
            progress_ms = data['progress_ms']/1000
            duration = data['item']['duration_ms']/1000
            return name, artist, album_art, progress_ms, duration
        return

    def get_track_data(self,trackid):
        sp = self.getSp()
        try:
            data = sp.track(trackid)
            name = data['name']
            artist = data['artists'][0]['name']
            album_art = data['album']['images'][0]['url']
            return name, artist, album_art
        except:
            return

    def getSong(self, query, limit = 3): #takes in query, outputs top 3 relevant serches in an array
        sp = self.getSp()
        B = sp.search(query, limit = limit, type = 'track')
        l = len(B['tracks']['items'])
        A = B['tracks']['items'][0:l]
        stripped = []
        for a in A:
            stripped.append({'id':a['id'] , 'name':a['name'], 'artist':a['artists'][0]['name']})
        return stripped
    
    def stripRecs(self, B):
        l = len(B['tracks'])
        A = B['tracks'][0:l]
        stripped = []
        for a in A:
            stripped.append({'id':a['id'] , 'name':a['name'], 'artist':a['artists'][0]['name']})
        return stripped[0:3]

    def isEmpty(self):
        return self.len == 0

    def addtoQueue(self, song):
        song['upvotes'] = 1
        song['downvotes'] = 0
        song['votes'] = 1
        if not self.isEmpty():
            if(self.local_queue[-1]['votes'] >0):
                self.local_queue.append(song)
            else:
                left,right=0,self.len
                while (left < right):
                    mid = left + (right - left)//2
                    if self.local_queue[mid]['votes'] <= 1:
                        right = mid
                    else:
                        left = mid + 1
                self.local_queue.insert(left, song)
        else:
            self.local_queue.append(song)
        self.len+=1
        # if self.len > 2 and self.Recs: #RECOMMENDATION STUFF
        #     return self.stripRecs(self.sp.recommendations(seed_tracks = self.getCurrentQueueIds()[0:min(3,self.len)]))
        return None
    
    def popfromQueue(self): #Want to Ping client after we use this so they know to get the current song
        sp = self.getSp()
        song = self.local_queue.pop(0)
        sp.add_to_queue(song['id'])
        self.just_added = song['id']
        self.current_song = song
        self.len-=1

    def getCurrentQueue(self):
        return self.local_queue

    def getCurrentQueueIds(self):
        ids = []
        for a in self.local_queue:
            ids.append(a['id'])
        return ids

    def getCurrentSong(self):
        return self.current_song

    def nextSong(self): #Top of the Queue
        if(self.len == 0):
            return None
        return self.local_queue[0]

    def addVote(self, songid, dir): #Keep sorted directly after adding votes, PING CLIENT IF RETURNS 1
        Q = self.local_queue
        x = 0
        for x in range(self.len):
            if(Q[x]['id'] == songid):
                Q[x]['upvotes']+=dir
                Q[x]['votes']+=dir
                break;
        y = x-1
        while(y >= -1):
            if y == -1 or Q[x]['votes'] <= Q[y]['votes']:
                Q.insert(y+1,Q.pop(x))
                break;
            y-=1
        if y != x-1:
            return 1
        return -1
    
    def removeVote(self, songid, dir): #Keep sorted directly after removing votes, PING CLIENT IF RETURNS 1
        Q = self.local_queue
        x = 0
        for x in range(len(Q)):
            if(Q[x]['id'] == songid):
                Q[x]['downvotes']+=dir
                Q[x]['votes']+=dir
                break;
        y = x+1
        while(y <= len(Q)):
            if y == len(Q) or Q[x]['votes'] >= Q[y]['votes']:
                Q.insert(y-1,Q.pop(x))
                break;
            y+=1
        if(Q[x]['votes'] < self.cutoff()):
            self.kickLast() #Figure out pings later luLULULULULULUL

        if y != x+1:
            return 1
        return -1

    def updateVote(self,songid, dir):
        if(dir < 0):
            return self.removeVote(songid, dir) #HERE PING CLIENT??
        else:
            return self.addVote(songid) #HERE PING CLIENT??

    def someFunction(self):
        data = self.getCurrentlyPlaying()
        if data:
            if (data[4] - data[3] < 10 and self.just_added != self.nextSong()):
                self.popfromQueue()
            else:
                return 
        elif not self.len == 0:
            self.popfromQueue()

    def testFunc(self):
        for i in range(10):
            self.someFunction()
            time.sleep(5)
    
    def skipSong(self):
        sp = self.getSp()
        sp.next_track()

    def pause(self):
        sp = self.getSp()
        sp.pause_playback()
    
    def play(self, device = None):
        sp = self.getSp()
        sp.start_playback(device)

    def getDevice(self):
        sp = self.getSp()
        return sp.devices()

    def clearQueue(self):
        self.len = 0
        self.local_queue = []
        self.just_added = None

    def pushQueue(self):
        for x in range(self.len):
            self.popfromQueue()
    
    def addUser(self):
        self.users += 1
    
    def cutoff(self):
        return -self.users/2

    def kickLast(self): #Also Ping? How to do this?
        return
    #     self.local_queue.pop()
    #     self.len-=1
    
    def sendDanAll(self):
        data = {}
        data['queue'] = self.local_queue
        data['song'] = self.current_song
        return data
