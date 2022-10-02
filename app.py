from flask import Flask
app = Flask(__name__, static_folder='./frontend/build', static_url_path='/')

@app.route('/')
def index():
    return "Hello World!"
    # return app.send_static_file('index.html')
@app.errorhandler(404)
def not_found(e):
    return "Hello World!"
    # return app.send_static_file('index.html')


@app.route('/hello/', methods=['GET', 'POST'])
def welcome():
    return "Hello World!"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=105)
