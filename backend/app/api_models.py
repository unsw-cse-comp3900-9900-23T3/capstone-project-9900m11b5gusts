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
        'city': fields.String(example='a new city'),
        'suburb': fields.String(example='a new suburb')

})

