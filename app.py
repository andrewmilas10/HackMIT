from flask import Flask, url_for, redirect
from flask_socketio import SocketIO, emit
from flask_socketio import join_room, leave_room
from flask_cors import CORS

app = Flask(__name__, static_folder='./frontend/build', static_url_path='/')
socketio = SocketIO(app)
CORS(app)

import spotipy
from spotipy.oauth2 import SpotifyOAuth

scope = "user-read-currently-playing user-read-playback-state user-modify-playback-state"
client_id='f038c9e7ef86446fa418a6dbc29fe429'
client_secret='2b6c56181a484c0ca0464c811778574a'
redirect_uri='http://localhost:3000/callback'

@app.route('/')
def index():
    return app.send_static_file('index.html')
@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

@app.route('/hello/', methods=['GET', 'POST'])
def welcome():
    return "Hello World!safdsaf AdfdsasdssssssHIHIA"

@app.route('/login', methods=['GET', 'POST'])
def verify():
    sp_oauth = create_spotify_oauth()
    auth_url = sp_oauth.get_authorize_url()
    print(auth_url)
    return redirect(auth_url)

@app.route('/callback')
def redirectPage():
    return "Redirect"

def create_spotify_oauth():
    return SpotifyOAuth(
        client_id=client_id,
        client_secret=client_secret,
        # redirect_uri=url_for("/callback/", _external=True),
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
