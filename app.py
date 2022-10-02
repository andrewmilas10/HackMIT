from flask import Flask, request, url_for, redirect
from flask_socketio import SocketIO, emit
from flask_socketio import join_room, leave_room
from room import Room
from flask_cors import CORS
import random
import uuid

app = Flask(__name__, static_folder='./frontend/build', static_url_path='/')
socketio = SocketIO(app)
CORS(app)
import sys
import spotipy
from spotipy.oauth2 import SpotifyOAuth

scope = "user-read-currently-playing user-read-playback-state user-modify-playback-state"
client_id='f038c9e7ef86446fa418a6dbc29fe429'
client_secret='2b6c56181a484c0ca0464c811778574a'
redirect_uri='http://127.0.0.1:5000/callback'
CACHE = '.spotipyoauthcache'
access_token = ""

rooms = {}

current_oauths = []

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
    socketio.run(app, host='0.0.0.0', port=105)
