from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask import Flask, flash, url_for, redirect
from flask_restx import Api, Resource, fields, reqparse
from models import db, user_register, user_login, User, user_query_by_email, password_update
from flask_cors import CORS
from flask_mail import Mail,Message

app = Flask(__name__)
CORS(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
api = Api(app)
jwt = JWTManager(app)


'''
    定义API测试数据输入字段
'''
# reset
reset_parser = reqparse.RequestParser()
reset_model = api.model('reset_data', {
    'user_email': fields.String(example='root1@unsw.edu.au')
})
# reset password
reset_password_parser = reqparse.RequestParser()
reset_password_model = api.model('reset_password_data', {
    'password': fields.String(example='123456'),
    'confirm_password': fields.String(example='123456'),
})

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

def send_mail(user):
    token = user.get_token()
    msg = Message(subject='Password Reset Request', sender='923519550@qq.com', recipients=[user.email])
    msg.body = f''' To reset your password. Please follow the link below.

    {url_for('reset_token', token=token, _external=True)}

    If you didn't send a password reset request. Please ignore this message.

    '''
    mail.send(msg)

# 需要重置密码用户在邮件中点击链接 跳转到对应token的新页面 页面中 含有 重置 新密码和确认密码两栏
@api.route('/reset_password/<token>')
class ResetToken(Resource):
    @api.doc(description="Please check two password are the same before fetch\n")
    @api.expect(reset_password_model)
    def reset_token(token):
        user=User.verify_token(token)
        args = api.payload
        print("--------------------------")
        print(args['password'])
        if user is None:
            flash('That is invalid token or expired. Please try again.','warning')
            return redirect(url_for('reset_request'))

        register_result = password_update(user,**args)





#点击链接 跳转到输入 邮件地址页面 输入重置密码的邮件 调用send_mail发送邮件
@api.route('/reset_password')
class ResetPassword(Resource):
    @api.doc(description="Reset password\n")
    @api.expect(reset_model)
    def post(self):
        args = api.payload
        # username = args['user_email']

        login_result = user_query_by_email(**args)
        if login_result['result'] != False:
            user = login_result['result']
            print('===============')
            print(user.password)
            send_mail(user)
            print('===============')
            flash('Reset request sent. Check your email.','success')
            return redirect(url_for('login'))


@api.route('/login')
class Login(Resource):
    @api.doc(description="login name and password\n")
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
    @api.doc(description="Please check two password are the same before fetch\n")
    @api.expect(register_model)
    def post(self):
        args = api.payload
        register_result = user_register(**args)
        if register_result['result']:
            access_token = create_access_token(identity=args['register_email'])
            return {'token': access_token}, 200
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
    app.config['MAIL_SERVER'] = 'smtp.qq.com'
    app.config['MAIL_PORT'] = 465
    app.config['MAIL_USE_SSL'] = True
    app.config['MAIL_USE_TLS'] = False
    app.config['MAIL_USERNAME'] = '923519550@qq.com'
    app.config['MAIL_PASSWORD'] = 'gxoytwwtloombegh'

    mail = Mail(app)
    db.init_app(app=app)
    with app.app_context():
        # db.drop_all()
        db.drop_all()
        db.create_all()
    app.run(debug=True, port=5000)