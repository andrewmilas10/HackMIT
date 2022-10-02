from flask import Flask
app = Flask(__name__, static_folder='./frontend/build', static_url_path='/')

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
    # return 'hello world'
    sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id, client_secret, redirect_uri, scope=scope))

    return sp.current_user_playing_track()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=105)
