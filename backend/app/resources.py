from flask_restx import Resource, Namespace
from .api_models import login_model, register_model
from .models import user_register, user_login
from flask_jwt_extended import create_access_token, jwt_required

Authors = Namespace('Authors')


@Authors.route("/login")
class Login(Resource):
    @Authors.expect(login_model)
    def post(self):
        args = Authors.payload
        login_result = user_login(**args)
        if login_result['result']:
            access_token = create_access_token(identity=args['user_email'])
            return {'token': access_token}, 200
        else:
            return {'error': login_result['info']}, 400


@Authors.route('/register')
class Register(Resource):
    @Authors.expect(register_model)
    # @Authors.marshal_list_with(register_model)
    def post(self):
        args = Authors.payload
        register_result = user_register(**args)
        if register_result['result']:
            access_token = create_access_token(identity=args['register_email'])
            return {'token': access_token}, 200
        else:
            return {'error': register_result['info']}, 400


