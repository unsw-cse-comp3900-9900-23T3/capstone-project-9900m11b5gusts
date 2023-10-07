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

changeProfile_model = api.model('changeProfile_data', {
        'username': fields.String(example='a new name'),
        'gender': fields.String(example='a new gender'),
        'state': fields.String(example='a new state'),
        'suburb': fields.String(example='a new suburb')
})

insertItem_model = api.model('insertItem_data', {
        'item_name': fields.String(example='pen'),
        'description': fields.String(example='some description about this item'),
        'price': fields.String(example='66.66'),
        'num': fields.String(example='2'),
        'class1': fields.String(example='coles'),
        'class2': fields.String(example='study'),
        'class3': fields.String(example='stationery')
})

get_personal_item_model = api.model('get_personal_item_data', {
        'user_email': fields.String(example='root@qq.com')
})

update_personal_item_model = api.model('update_personal_item_data', {
        'item_id': fields.String(example='2'),
        'item_name': fields.String('pencil'),
        'description': fields.String('a new description'),
        'price': fields.String(example='55.55'),
        'num': fields.String(example='1'),
        'class1': fields.String(example='woolworth'),
        'class2': fields.String(example='working'),
        'class3': fields.String(example='pens'),
        'change': fields.String(example='1')
})

