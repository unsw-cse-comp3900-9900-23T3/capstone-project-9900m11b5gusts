from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask import Flask
from flask_restx import Api, Resource, fields, reqparse
from models import db, user_register, user_login


app = Flask(__name__)
api = Api(app)
jwt = JWTManager(app)


'''
    定义API测试数据输入字段
'''
# login
login_parser = reqparse.RequestParser()
login_model = api.model('login_data', {
    'user_email': fields.String(example='root1@unsw.edu.au'),
    'password': fields.String(example='123456'),
})
# register
register_parser = reqparse.RequestParser()
register_model = api.model('register_data', {
    'register_email': fields.String(example='root2@unsw.edu.au'),
    'username': fields.String(example='root'),
    'password': fields.String(example='123456'),
    'identity': fields.String(example='manager')
})


@api.route('/login')
class Login(Resource):
    @api.doc(description="Get all books")
    @api.expect(login_model)
    def post(self):
        args = api.payload
        # username = args['user_email']
        login_result = user_login(**args)
        if login_result['result']:
            access_token = create_access_token(identity=args['user_email'])
            return {'token': access_token}, 200
        else:
            return {'login failed': login_result['info']}, 400


@api.route('/register')
class Register(Resource):
    @api.expect(register_model)
    def post(self):
        args = api.payload
        register_result = user_register(**args)
        if register_result['result']:
            return register_result['info'], 200
        else:
            return register_result['info'], 400


# @api.route('/profile')
# class Profile(Resource):
#     @jwt_required
#     @api.doc(description="Protected profile resource")
#     def get(self):
#         current_user = get_jwt_identity()
#         return {'message': f'Hello, {current_user}'}, 200


if __name__ == '__main__':
    db_uri = 'sqlite:///sqlite3.db'
    app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = 'secret-key'
    db.init_app(app=app)
    with app.app_context():
        # db.drop_all()
        db.drop_all()
        db.create_all()
    app.run(debug=True, port=5000)