from flask import Flask, request, url_for, redirect
from flask_socketio import SocketIO, emit
from flask_socketio import join_room, leave_room
from room import Room
from flask_cors import CORS
import random
import uuid
import threading
import time


app = Flask(__name__, static_folder='./frontend/build', static_url_path='/')
socketio = SocketIO(app)
CORS(app)
import sys
import spotipy
from spotipy.oauth2 import SpotifyOAuth

scope = "user-read-currently-playing user-read-playback-state user-modify-playback-state"
client_id='8f8a8980909d4e10a27e9e4e7ac702f5'
client_secret='ce890f30ea2749849d1e48faa8f81f05'
redirect_uri='http://127.0.0.1:5000/callback'
CACHE = '.spotipyoauthcache'
access_token = ""

rooms = {}

current_oauths = []

def looper_thread():
    print("doing stuff")
    while True:
        for r in rooms:
            print("NEW LINES\n")
            rooms[r].someFunction()
        time.sleep(5)

@app.route('/login', methods=['GET', 'POST'])
def verify():
    sp_oauth = SpotifyOAuth(client_id, client_secret,redirect_uri,scope=scope, open_browser=True)
    current_oauths.append(sp_oauth)
    auth_url = sp_oauth.get_authorize_url()
    print("redirect", auth_url, file=sys.stdout)
    return redirect(auth_url)


@app.route('/callback', methods=['GET', 'POST'])
def index():
    if len(current_oauths) == 0:
        sp_oauth = SpotifyOAuth(client_id, client_secret,redirect_uri,scope=scope, open_browser=True)
    else:
        sp_oauth = current_oauths[-1]

    token_info = sp_oauth.get_cached_token()
    if token_info:
        access_token = token_info['access_token']
    else:
        url = request.url
        code = sp_oauth.parse_response_code(url)
        if code:
            token_info = sp_oauth.get_access_token(code)
            access_token = token_info['access_token']
    if sp_oauth.is_token_expired(token_info):
        token_info = sp_oauth.refresh_access_token(token_info['refresh_token'])
        access_token = token_info['access_token']
    if access_token:
        sp = spotipy.Spotify(access_token)
        room_id = uuid.uuid1()
        rooms[str(room_id)] = Room(sp_oauth)
        return redirect('http://localhost:3000/' + str(room_id))
    
    return 'test'

@app.route('/search', methods=['GET', 'POST'])
def search():
    params = request.get_json()['params']
    room_id, query = params['room_id'], params['query']
    return rooms[room_id].getSong(query)

@app.route('/upvote', methods=['GET', 'POST'])
def upvote():
    params = request.get_json()['params']
    room_id, songid = params['room_id'], params['song']['id']
    rooms[room_id].addVote(songid, 1)
    socketio.emit("update_state", rooms[room_id].sendDanAll(), to=room_id)
    return ''

@app.route('/downvote', methods=['GET', 'POST'])
def downvote():
    params = request.get_json()['params']
    room_id, songid = params['room_id'], params['song']['id']
    rooms[room_id].removeVote(songid, -1)
    socketio.emit("update_state", rooms[room_id].sendDanAll(), to=room_id)
    return ''

@app.route('/queue', methods=['GET', 'POST'])
def queue():
    params = request.get_json()['params']
    room_id, song = params['room_id'], params['song']
    rooms[room_id].addtoQueue(song)
    socketio.emit("update_state", rooms[room_id].sendDanAll(), to=room_id)
    return ''


@socketio.on('join')
def on_join(data):
    # username = data['username']
    room = data['room']
    join_room(room)
    # send(username + ' has entered the room.', to=room)

@socketio.on('leave')
def on_leave(data):
    # username = data['username']
    room = data['room']
    leave_room(room)
    # send(username + ' has left the room.', to=room)


if __name__ == '__main__':
    print("POOP")
    x = threading.Thread(target = looper_thread).start()
    socketio.run(app, host='0.0.0.0', port=105)
