from flask_restx import Resource, Namespace
from .api_models import login_model, register_model, changeProfile_model, insertItem_model, get_personal_item_model, \
    update_personal_item_model, search_items_model, forget_password_model, reset_password_model, \
    delete_personal_item_model, create_activity_model, search_activity_model, delete_activity_model, \
    update_activity_model, search_items_by_category_model, check_profile_model, \
    delete_user_model, update_activity_permission_model, approve_activity_permission_model, \
    insert_wishlist_model, insert_inventory_model, get_wish_list_model, delete_wishList_model, update_wishList_model
from .models import user_register, user_login, get_profile, update_profile, insert_item, get_personal_item, \
    update_personal_item, search_item, forget_pass, reset_password, delete_personal_item, search_activity, \
    get_user_identity, create_activity, delete_activity, update_activity, search_item_by_category, show_user_identity, \
    delete_user, modify_permission, show_activities_infor, approve_activity, time_test, insert_wish_list, insert_inventory, \
    update_wish_list, delete_wish_list, check_wish_item
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from collections import OrderedDict

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
    @Author.doc(description='User register: Manager code:[zxcvb, asdfg, qwert] \
        Admin_code:[poiuy, lkjhg, mnbvc]')
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
    @Author.doc(description='Forget password, user input the email')
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
            return {'success': OrderedDict(result['info'])}, 200
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


@Author.route('/checkOtherProfile')
class OtherProfile(Resource):
    @Author.expect(check_profile_model)
    def post(self):
        args = Author.payload
        email = args['email']
        profile = get_profile(email)
        return {'success': profile}, 200


Item = Namespace('Items')


@Item.route('/getCategory')
class GetItemCategory(Resource):
    @Item.doc(description='get all item category')
    def get(self):
        item_category = {}
        coles = {
            'Disney cards': {'Wonder Woman': '', 'Batgirl': '', 'Robin': '', 'Cyclone': '', 'Reverse flash': '', 'The riddler': ''},
            'Superhero cards': {'Captain America': '', 'Iron Man': '', 'Thor': '', 'Hulk': '', 'Black Widow': '', 'Hawkeye': ''},
            'Fresh Rainbow Stikeez': {'Apple': '', 'Banana': '', 'Orange': '', 'Grape': '', 'Strawberry': '', 'Blueberry': '', 'Pear': '', 'Peach': ''},
            'Memorabilia': {'Signed photographs': '', 'Signed basketballs': '', 'team flags': ''},
            'Electronic Device Accessories': {'USB': '', 'Portable charger': '', 'VGA': '', 'Vga converter': ''},
            'Other': ''
        }
        woolworth = {
            'Brick': {'Animal set': '', 'Quad bike': '', 'Farm truck': '', 'Farm Tractor': '', 'Farm shed': ''},
            'Garage kit': {'Pokemon anime': '', 'Monster hunter': '', 'Demon slayer kokushibo': '', 'Hunter killua zoldyck': '', 'Anime figuur Hatsune miku ghost': ''},
            'Mini collectibles': {'Bread': '', 'Eggs': '', 'Canned goods': '', 'Fresh vegetables': '', 'Fruits': '', 'Laundry detergent': '', 'Dish soap': ''},
            'Home goods': {'Pillows': '', 'Blankets': '', 'Wall decals': '', 'Bed': ''}
        }
        others = ''
        item_category['Coles'] = coles
        item_category['Woolworth'] = woolworth
        item_category['Others'] = others
        return item_category, 200


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
    @time_test
    def post(self, page):
        args = Item.payload
        result = search_item(page, **args)
        if result['result']:
            # print(result['info'])
            # print('-------------')
            # print({'success': result['info']})
            return {'success': result['info']}, 200
        else:
            return {'error': result['info']}, 400


@Item.route('/searchItemByCategory/<int:page>')
class SearchItemByCategory(Resource):
    @Item.doc(description='Search item by 3 categories, empty string means no filter')
    @Item.expect(search_items_by_category_model)
    def post(self, page):
        args = Item.payload
        result = search_item_by_category(page, **args)
        return {'success': result['info']}, 200


@Item.route('/getWishList')
class GetWishList(Resource):
    @Item.doc(description='use email to get specific user(including himself) wish items, empty string means all user wish list item.')
    @Item.expect(get_wish_list_model)
    def post(self):
        args = Item.payload
        email = args['email']
        result = check_wish_item(email)
        if result['info']:
            return {'success': result['info']}, 200
        else:
            return {'error': result['info']}, 400


@Item.route('/deleteWishList')
class DeleteWishList(Resource):
    @Item.doc(description='delete wish list item wish item id')
    @Item.doc(security='jsonWebToken')
    @Item.expect(delete_wishList_model)
    @jwt_required()
    def delete(self):
        args = Item.payload
        email = get_jwt_identity()
        result = delete_wish_list(email, **args)
        if result['info']:
            return {'success': result['info']}, 200
        else:
            return {'error': result['info']}, 400


@Item.route('/insertWishList')
class InsertWishList(Resource):
    @Item.doc(description='post the item the user wanted')
    @Item.expect(insert_wishlist_model)
    @Item.doc(security='jsonWebToken')
    @jwt_required()
    def post(self):
        args = Item.payload
        email = get_jwt_identity()
        result = insert_wish_list(email, **args)
        if result['info']:
            return {'success': result['info']}, 200
        else:
            return {'error': result['info']}, 400


@Item.route('/updateWishList')
class UpdateWishList(Resource):
    @Item.doc(description='update wish list item by wish list item id')
    @Item.doc(security='jsonWebToken')
    @Item.expect(update_wishList_model)
    @jwt_required()
    def post(self):
        args = Item.payload
        email = get_jwt_identity()
        result = update_wish_list(email, **args)
        if result['info']:
            return {'success': result['info']}, 200
        else:
            return {'error': result['info']}, 400


@Item.route('/insertInventory')
class InsertInventory(Resource):
    @Item.doc(description='post the item the user wanted')
    @Item.expect(insert_inventory_model)
    @Item.doc(security='jsonWebToken')
    @jwt_required()
    def post(self):
        args = Item.payload
        email = get_jwt_identity()
        result = insert_inventory(email, **args)
        if result['info']:
            return {'success': result['info']}, 200
        else:
            return {'error': result['info']}, 400


'''-------------------------------'''

Activity = Namespace('Activity', authorizations=authorizations)


@Activity.route('/searchActivity/<int:page>')
class SearchActivity(Resource):
    @Activity.doc(description='Can search activity by name and category and status')
    @Activity.expect(search_activity_model)
    def post(self, page):
        args = Activity.payload
        result = search_activity(page, **args)
        if result['result']:
            return {'success': result['info']['activities']}, 200
        else:
            return {'error': result['info']}, 400


@Activity.route('/createActivity')
class CreateActivity(Resource):
    @Activity.doc(description='Manager can create new activities')
    @Activity.doc(security='jsonWebToken')
    @jwt_required()
    @Activity.expect(create_activity_model)
    def post(self):
        args = Activity.payload
        email = get_jwt_identity()
        identity = get_user_identity(email)

        if identity == "manager" or identity == "administrator":
            result = create_activity(email, **args)

            if result['result']:
                return {'success': result['info']}, 200
            else:
                return {'error': result['info']}, 400
        else:
            return {'error': f'Only manager or administrator can create the activity'}, 400


@Activity.route('/deleteActivity')
class DeleteActivity(Resource):
    @Activity.doc(description='Can delete activity')
    @Activity.doc(security='jsonWebToken')
    @jwt_required()
    @Activity.expect(delete_activity_model)
    def delete(self):
        args = Activity.payload
        email = get_jwt_identity()
        result = delete_activity(email, **args)
        if result['result']:
            return {'success': result['info']}, 200
        else:
            return {'error': result['info']}, 400


@Activity.route('/editActivity')
class EditActivity(Resource):

    @Activity.doc(description='Edit the activity information')
    @Activity.doc(security='jsonWebToken')
    @jwt_required()
    @Activity.expect(update_activity_model)
    def post(self):
        args = Activity.payload
        email = get_jwt_identity()

        update_activity_result = update_activity(email, **args)
        if update_activity_result['result']:
            return {'success': update_activity_result['info']}, 200
        else:
            return {'error': update_activity_result['info']}, 400


@Activity.route('/showActivity/<int:page>/<int:pagesize>')
class ShowActivityInfor(Resource):
    @Activity.doc(description='Show all the activities')
    def post(self, page, pagesize):
        result = show_activities_infor(page, pagesize)
        if result['result']:
            return {'success': result['info']['activities'], 'total': result['info']['total_rows'], 'pageSize': pagesize, 'page': page}, 200
        else:
            return {'error': result['info']}, 400


'''------Admin-----'''
Admin = Namespace('Admin', authorizations=authorizations)


@Admin.route('/infor/<int:page>/<int:pagesize>')
class ShowInfor(Resource):
    @Admin.doc(description='Show the permission and status of all users')
    @Admin.doc(security='jsonWebToken')
    @jwt_required()
    def post(self, page, pagesize):
        email = get_jwt_identity()
        identity = get_user_identity(email)
        if identity == "administrator":
            result = show_user_identity(page, pagesize)
            if result['result']:
                return {'success': result['info']['users'], 'total': result['info']['total_rows'], 'pageSize': pagesize, 'page': page}, 200
            else:
                return {'error': result['info']}, 400
        else:
            return {'error': 'insufficient privileges'}, 400


@Admin.route('/deleteUser')
class DeleteUser(Resource):
    @Admin.doc(description='Can delete activity')
    @Admin.doc(security='jsonWebToken')
    @jwt_required()
    @Admin.expect(delete_user_model)
    def delete(self):
        args = Admin.payload
        email = get_jwt_identity()
        identity = get_user_identity(email)
        if identity == "administrator":
            result = delete_user(**args)
            if result['result']:
                return {'success': result['info']}, 200
            else:
                return {'error': result['info']}, 400
        else:
            return {'error': 'insufficient privileges'}, 400


@Admin.route('/modifyPermission')
class ModifyPermission(Resource):
    @Admin.doc(description='Edit the permission of all users')
    @Admin.doc(security='jsonWebToken')
    @jwt_required()
    @Admin.expect(update_activity_permission_model)
    def post(self):
        args = Admin.payload
        email = get_jwt_identity()
        identity = get_user_identity(email)
        if identity == "administrator":
            update_activity_result = modify_permission(**args)
            if update_activity_result['result']:
                return {'success': update_activity_result['info']}, 200
            else:
                return {'error': update_activity_result['info']}, 400
        else:
            return {'error': 'insufficient privileges'}, 400


@Admin.route('/approveActivity')
class ApproveActivity(Resource):
    @Admin.doc(description='Approve the activity')
    @Admin.doc(security='jsonWebToken')
    @jwt_required()
    @Admin.expect(approve_activity_permission_model)
    def post(self):
        args = Admin.payload
        email = get_jwt_identity()
        identity = get_user_identity(email)
        if identity == "administrator":
            result = approve_activity(**args)
            if result['result']:
                return {'success': result['info']}, 200
            else:
                return {'error': result['info']}, 400
        else:
            return {'error': 'insufficient privileges'}, 400
