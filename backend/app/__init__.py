from flask import Flask
from .extensions import api, db, jwt
from .resources import Author, Item
from flask_cors import CORS
from datetime import timedelta

def create_app():
    app = Flask(__name__)

    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
    app.config['JWT_SECRET_KEY'] = 'secret-key'

    db_uri = 'sqlite:///sqlite3.db'
    app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    api.init_app(app)
    db.init_app(app)

    api.add_namespace(Author)
    api.add_namespace(Item)

    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)  # 1 hour expired
    app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)
    jwt.init_app(app)
    with app.app_context():
        # db.drop_all()
        db.drop_all()
        db.create_all()

    return app