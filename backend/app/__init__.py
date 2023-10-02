from flask import Flask
from .extensions import api, db, jwt
from .resources import Authors
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
    app.config['JWT_SECRET_KEY'] = 'secret-key'

    db_uri = 'sqlite:///sqlite3.db'
    app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    api.init_app(app)
    db.init_app(app)
    jwt.init_app(app)

    api.add_namespace(Authors)
    with app.app_context():
        # db.drop_all()
        db.drop_all()
        db.create_all()

    return app