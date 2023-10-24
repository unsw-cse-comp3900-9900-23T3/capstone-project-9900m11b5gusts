from flask_restx import fields
from .extensions import api


login_model = api.model('login_data', {
        'user_email': fields.String(example='root@qq.com'),
        'password': fields.String(example='123456')
})

register_model = api.model('register_data', {
        'register_email': fields.String(example='root@qq.com'),
        'username': fields.String(example='root'),
        'password': fields.String(example='123456'),
        'identity': fields.String(example='manager')
})

forget_password_model = api.model('forget_password_data', {
        'email': fields.String(example='root@qq.com')
})

reset_password_model = api.model('reset_password_model', {
        'email': fields.String(example='root@qq.com'),
        'code': fields.String(example='123456'),
        'new_password': fields.String(example='a new password')
})

check_profile_model = api.model('check_profile_data', {
        'email': fields.String(example='root@qq.com')
})

changeProfile_model = api.model('changeProfile_data', {
        'username': fields.String(example='a new name'),
        'image': fields.String(example='a new image'),
        'gender': fields.String(example='a new gender'),
        'state': fields.String(example='a new state'),
        'suburb': fields.String(example='a new suburb')
})

insertItem_model = api.model('insertItem_data', {
        'item_name': fields.String(example='pen'),
        'image': fields.String(example='a image of item'),
        'description': fields.String(example='some description about this item'),
        'price': fields.String(example='66.66'),
        'num': fields.String(example='2'),
        'class1': fields.String(example='coles'),
        'class2': fields.String(example='study'),
        'class3': fields.String(example='stationery'),
        'trading_method': fields.String(example='cash'),
        'exchange_item': fields.String(example=''),
        'change': fields.Boolean(example=False)
})

get_personal_item_model = api.model('get_personal_item_data', {
        'user_email': fields.String(example='root@qq.com')
})

update_personal_item_model = api.model('update_personal_item_data', {
        'item_id': fields.String(example='2'),
        'item_name': fields.String('pencil'),
        'image': fields.String('a new image of item'),
        'description': fields.String('a new description'),
        'price': fields.String(example='55.55'),
        'num': fields.String(example='1'),
        'class1': fields.String(example='woolworth'),
        'class2': fields.String(example='working'),
        'class3': fields.String(example='pens'),
        'trading_method': fields.String(example='exchange'),
        'exchange_item': fields.String(example='PenBox'),
        'change': fields.Boolean(example=False)
})

delete_personal_item_model = api.model('delete_personal_item_data', {
        'item_id': fields.String(example='2')
})


search_items_model = api.model('search_items_data', {
        'keyword': fields.String(example='pen'),
        'class1': fields.String(example='coles'),
        'class2': fields.String(example='study'),
        'class3': fields.String(example='stationery'),
        'price_sorted': fields.String(example='default'),
        'trading_method': fields.String(example='cash'),
        'change': fields.Boolean(example=False)
})

search_items_by_category_model = api.model('search_items_by_category_data',{
      'class1': fields.String(example='Coles'),
      'class2': fields.String(example='Disney cards'),
      'class3': fields.String(example='Wonder Woman')
})

search_activity_model = api.model('search_activity_model', {
        'activity_name': fields.String(example='name'),
        'category': fields.String(example='category'),
        'status': fields.String(example='status')
})

create_activity_model = api.model('create_activity', {
        'activity_name': fields.String(example='name'),
        'category': fields.String(example='category'),
        'overview': fields.String(example='overview'),
        'detail': fields.String(example='detail'),
        'image': fields.String(example='a new image')
})

delete_activity_model = api.model('delete_activity_model', {
        'activity_name': fields.String(example='name'),
        'category': fields.String(example='category')
})

delete_user_model = api.model('delete_user_model', {
        'user_email': fields.String(example='syukay00789@gmail.com')
})

update_activity_model = api.model('update_activity', {
        'activity_name': fields.String(example='name'),
        'status': fields.String(example='status'),
        'category': fields.String(example='category'),
        'overview': fields.String(example='overview'),
        'detail': fields.String(example='detail'),
        'image': fields.String(example='a new image')
})

update_activity_permission_model = api.model('update_activity_permission_model', {
        'email': fields.String(example='syukay00789@gmail.com'),
        'identity': fields.String(example='manager')
})

approve_activity_permission_model = api.model('approve_activity_permission_model', {
        'name': fields.String(example='Art exhibition'),
        'category': fields.String(example='art'),
        'status': fields.String(example='status')
})

# search_user_infor_model = api.model('search_user_infor', {
#         'image': fields.String(example='user image'),
#         'username': fields.String(example='username name'),
#         'identity': fields.String(example='1'),
#         'lock': fields.String(example='1'),
#         'user_email': fields.String(example='syukay00789@gmail.com')
# })

