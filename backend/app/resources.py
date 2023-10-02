from flask_restx import Resource, Namespace
from .api_models import login_model, register_model, changeProfile_model
from .models import user_register, user_login, get_profile, update_profile
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


authorizations = {
    'jsonWebToken': {
        'type': 'apiKey',
        'in': 'header',
        'name': 'Authorization'
    }
}

'''------Author-----'''
Author = Namespace('Authors', authorizations=authorizations)


@Author.route("/login")
class Login(Resource):
    @Author.doc(description='User login')
    @Author.expect(login_model)
    def post(self):
        args = Author.payload
        login_result = user_login(**args)
        if login_result['result']:
            access_token = create_access_token(identity=args['user_email'])
            return {'token': access_token}, 200
        else:
            return {'error': login_result['info']}, 400


@Author.route('/register')
class Register(Resource):
    @Author.doc(description='User register')
    @Author.expect(register_model)
    def post(self):
        args = Author.payload
        register_result = user_register(**args)
        if register_result['result']:
            access_token = create_access_token(identity=args['register_email'])
            return {'token': access_token}, 200
        else:
            return {'error': register_result['info']}, 400


@Author.route('/profile')
class Profile(Resource):
    method_decorators = [jwt_required()]

    @Author.doc(description='Get user profile information')
    @Author.doc(security='jsonWebToken')
    def get(self):
        # 获取用户个人信息
        email = get_jwt_identity()
        user_profile = get_profile(email)
        return user_profile, 200

    @Author.doc(description='Update user profile')
    @Author.doc(security='jsonWebToken')
    @Author.expect(changeProfile_model)
    def post(self):
        args = Author.payload
        email = get_jwt_identity()
        update_profile_result = update_profile(email, **args)
        if update_profile_result['result']:
            return {'success': update_profile_result['info']}, 200
        else:
            return {'error': update_profile_result['info']}, 400


Item = Namespace('Items')


@Item.route('/Items')
class Items(Resource):
    @Item.expect()
    def post(self):
        args = Items.payload
        return 'post'


