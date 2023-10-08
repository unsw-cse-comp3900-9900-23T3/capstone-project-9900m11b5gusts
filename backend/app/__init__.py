from datetime import timedelta

from flask import Flask
from .extensions import api, db, jwt, mail
from .resources import Author, Item
from flask_cors import CORS


def create_app():
    app = Flask(__name__)

    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
    app.config['JWT_SECRET_KEY'] = 'secret-key'

    db_uri = 'sqlite:///sqlite3.db'
    app.config['SQLALCHEMY_DATABASE_URI'] = db_uri

    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USERNAME'] = 'jiangzerek1999@gmail.com'
    app.config['MAIL_PASSWORD'] = 'fivegusts'
    app.config['MAIL_USE_TLS'] = True

    api.init_app(app)
    db.init_app(app)
    api.add_namespace(Author)
    api.add_namespace(Item)
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24*7)  # 24*7 hour expired
    app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)

    mail.init_app(app)
    jwt.init_app(app)
    with app.app_context():
        # db.drop_all()

        db.drop_all()
        db.create_all()

    return app