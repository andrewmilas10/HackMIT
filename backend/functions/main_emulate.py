import flask
from main import rooms

app = flask.Flask('functions')
methods = ['GET', 'POST', 'PUT', 'DELETE']

@app.route('/rooms', methods=methods)
@app.route('/rooms/<path>', methods=methods)
def catch_all(path=''):
    flask.request.path = '/' + path
    return rooms(flask.request)

if __name__ == '__main__':
    app.run()
