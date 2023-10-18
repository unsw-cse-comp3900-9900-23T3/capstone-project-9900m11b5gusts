from flask_restx import Resource, Namespace
from .api_models import login_model, register_model, changeProfile_model, insertItem_model, get_personal_item_model, \
    update_personal_item_model, search_items_model, forget_password_model, reset_password_model, delete_personal_item_model
from .models import user_register, user_login, get_profile, update_profile, insert_item, get_personal_item, \
    update_personal_item, search_item, forget_pass, reset_password, delete_personal_item
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


@Author.route('/forgetPassword')
class ForgetPassword(Resource):
    @Author.doc(descroption='Forget password, user input the email')
    @Author.expect(forget_password_model)
    def post(self):
        args = Author.payload
        email = args['email']
        result = forget_pass(email)
        if result['result']:
            return {'success': result['info']}, 200
        else:
            return {'error': result['info']}, 400


@Author.route('/resetPassword')
class ResetPassword(Resource):
    @Author.doc(description='Reset email by filling code')
    @Author.expect(reset_password_model)
    def post(self):
        args = Author.payload
        result = reset_password(**args)
        if result['result']:
            return {'success': result['info']}, 200
        else:
            return {'error': result['info']}, 400


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


@Item.route('/uploadPersonalItem')
class UploadPersonalItem(Resource):

    @Item.doc(description='If cash: exchange is empty string')
    @Item.doc(security='jsonWebToken')
    @jwt_required()
    @Item.expect(insertItem_model)
    def post(self):
        args = Item.payload
        email = get_jwt_identity()
        insert_item_result = insert_item(email, **args)
        if insert_item_result['result']:
            return {'success': insert_item_result['info']}, 200
        else:
            return {'error': 'wrong'}, 400


@Item.route('/checkPersonalItem')
class CheckPersonalItem(Resource):

    @Item.doc(description='See user all personal items that he have')
    @Item.expect(get_personal_item_model)
    def post(self):
        args = Item.payload
        email = args['user_email']
        get_personal_item_result = get_personal_item(email)
        return {'success': get_personal_item_result['info']}, 200


@Item.route('/editPersonalItem')
class EditPersonalItem(Resource):

    @Item.doc(description='Edit the personal item, input empty string means do not changed(change column)')
    @Item.doc(security='jsonWebToken')
    @jwt_required()
    @Item.expect(update_personal_item_model)
    def post(self):
        args = Item.payload
        email = get_jwt_identity()
        update_personal_item_result = update_personal_item(email, **args)
        if update_personal_item_result['result']:
            return {'success': update_personal_item_result['info']}, 200
        else:
            return {'error': update_personal_item_result['info']}, 400


@Item.route('/deleteItem')
class DeleteItem(Resource):
    @Item.doc('delete personal item')
    @Item.doc(security='jsonWebToken')
    @jwt_required()
    @Item.expect(delete_personal_item_model)
    def delete(self):
        args = Item.payload
        email = get_jwt_identity()
        result = delete_personal_item(email, **args)
        if result['result']:
            return {'success': result['info']}, 200
        else:
            return {'error': result['info']}, 400


@Item.route('/searchItem/<int:page>')
class SearchItem(Resource):
    @Item.doc(description='Can search by keyword and sort the price(default,asc,desc) trading_method(cash,exchange), '
                          'every page has 10 records')
    @Item.expect(search_items_model)
    def post(self, page):
        args = Item.payload
        result = search_item(page, **args)
        if result['result']:
            return {'success': result['info']}, 200
        else:
            return {'error': result['info']}, 400


