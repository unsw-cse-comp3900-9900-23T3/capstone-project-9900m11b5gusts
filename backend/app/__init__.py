from datetime import timedelta
from flask import Flask
from .extensions import api, db, jwt, mail
from .resources import Author, Item, Activity, Admin, Topic
from flask_cors import CORS


def create_app():
    app = Flask(__name__)

    CORS(app, resources={r"/*": {"origins": "*"}})
    app.config['JWT_SECRET_KEY'] = 'secret-key'

    db_uri = 'sqlite:///sqlite3.db'
    app.config['SQLALCHEMY_DATABASE_URI'] = db_uri

    app.config['MAIL_SERVER'] = 'smtp.qq.com'
    app.config['MAIL_PORT'] = 465
    app.config['MAIL_USE_SSL'] = True
    app.config['MAIL_USE_TLS'] = False
    app.config['MAIL_USERNAME'] = '923519550@qq.com'
    app.config['MAIL_PASSWORD'] = 'gxoytwwtloombegh'

    api.init_app(app)
    db.init_app(app)
    api.add_namespace(Author)
    api.add_namespace(Item)
    api.add_namespace(Activity)
    api.add_namespace(Admin)
    api.add_namespace(Topic)
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(
        hours=24*7)  # 24*7 hour expired
    app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)

    mail.init_app(app)
    jwt.init_app(app)
    with app.app_context():
<<<<<<< HEAD
        # db.drop_all()
        db.drop_all()
=======
    # db.drop_all()
    #     db.drop_all()
>>>>>>> dd50759df712904efb46302dffd522a668095cac
        db.create_all()

    return app
