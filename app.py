from flask import Flask
from flask_socketio import SocketIO, emit
from flask_socketio import join_room, leave_room

app = Flask(__name__, static_folder='./frontend/build', static_url_path='/')
socketio = SocketIO(app)

import spotipy
from spotipy.oauth2 import SpotifyOAuth

scope = "user-read-currently-playing user-read-playback-state user-modify-playback-state"
client_id='f038c9e7ef86446fa418a6dbc29fe429'
client_secret='2b6c56181a484c0ca0464c811778574a'
redirect_uri='https://www.google.com/'

@app.route('/')
def index():
    return app.send_static_file('index.html')
@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

@app.route('/hello/', methods=['GET', 'POST'])
def welcome():
    return "Hello World!safdsaf AHIHIA"



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
