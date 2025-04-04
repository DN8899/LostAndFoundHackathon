from flask import Flask
from flask_cors import CORS
from Database.db import db
from Login.login import login_bp
from Routes.post_routes import post_bp
from Routes.user_routes import user_bp
from Routes.item_routes import item_bp

app = Flask(__name__)
app.url_map.strict_slashes = False

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Register routes here for users and items
app.register_blueprint(user_bp, url_prefix='/users')

app.register_blueprint(item_bp, url_prefix='/items')
app.register_blueprint(post_bp, url_prefix='/posts')
app.register_blueprint(login_bp, url_prefix='/login')

CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "DELETE"], "allow_headers": ["Content-Type"]}})
# Runs once
with app.app_context():
    db.create_all()

@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


if __name__ == '__main__':
    app.run(port=5000, debug=True)
