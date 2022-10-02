from flask import Flask, request, url_for, redirect
from flask_socketio import SocketIO, emit
from flask_socketio import join_room, leave_room
from flask_cors import CORS

app = Flask(__name__, static_folder='./frontend/build', static_url_path='/')
socketio = SocketIO(app)
CORS(app)
import sys
import spotipy
from spotipy.oauth2 import SpotifyOAuth

scope = "user-read-currently-playing user-read-playback-state user-modify-playback-state"
client_id='f038c9e7ef86446fa418a6dbc29fe429'
client_secret='2b6c56181a484c0ca0464c811778574a'
redirect_uri='http://localhost:3000/callback'
CACHE = '.spotipyoauthcache'
access_token = ""

# @app.route('/')
# def index():
#     return app.send_static_file('index.html')
# @app.errorhandler(404)
# def not_found(e):
#     return app.send_static_file('index.html')


# @app.route('/hello/')
# def login():
#     sp_oauth = create_spotify_oauth()
#     auth_url = sp_oauth.get_authorize_url()
#     print('url', auth_url, file=sys.stdout)
#     return redirect(auth_url)
sp_oauth = SpotifyOAuth(client_id, client_secret,redirect_uri,scope=scope, open_browser=True)

@app.route('/login', methods=['GET', 'POST'])
def verify():
    auth_url = sp_oauth.get_authorize_url()
    print("redirect", auth_url, file=sys.stdout)
    return redirect(auth_url)



@app.route('/hello/', methods=['GET', 'POST'])
def login():
    token_info = sp_oauth.get_cached_token()
    access_token = token_info['access_token']
    sp = spotipy.Spotify(auth=access_token)

    trackid = sp.current_user_playing_track()['item']['id']
    data = sp.track(trackid)
    name = data['name']
    artist = data['artists'][0]['name']
    album_art = data['album']['images'][0]['url']
    return {'name': name, 'artist': artist}


@app.route('/callback', methods=['GET', 'POST'])
def index():
    token_info = sp_oauth.get_cached_token()
    print("ACCESS", token_info, file=sys.stdout)
    if token_info:
        access_token = token_info['access_token']
    else:
       
        url = request.url
        print("URL", url, file=sys.stdout)
        code = sp_oauth.parse_response_code(url)
        if code:
            token_info = sp_oauth.get_access_token(code)
            access_token = token_info['access_token']
    if sp_oauth.is_token_expired(token_info):
        token_info = sp_oauth.refresh_access_token(token_info['refresh_token'])
        access_token = token_info['access_token']
        sp = spotipy.Spotify(auth=access_token)
    if access_token:
        sp = spotipy.Spotify(access_token)
        results = sp.current_user()
        return redirect('http://localhost:3000')
    # else:
    return 'test'


def create_spotify_oauth():
    return SpotifyOAuth(
        client_id=client_id,
        client_secret=client_secret,
        redirect_uri=redirect_uri,
        scope=scope
    )

@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    # send(username + ' has entered the room.', to=room)

@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    # send(username + ' has left the room.', to=room)


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=105)
