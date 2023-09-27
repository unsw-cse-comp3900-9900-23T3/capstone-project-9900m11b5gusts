from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
'''
    定义表结构
'''


class User(db.Model):
    __tablename__ = 'tb_user'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(30), unique=True, index=True)
    username = db.Column(db.String(30), unique=False, index=True)
    password = db.Column(db.String(30))
    identity = db.Column(db.String(10), default='user')


def user_register(**kwargs):
    input_register_email = kwargs['register_email']
    input_username = kwargs['username']
    input_password = kwargs['password']
    input_identity = kwargs['identity']
    # 输入数据格式校验

    # 数据库插入记录
    try:
        event = User(email=input_register_email, username=input_username, password=input_password,
                     identity=input_identity)
        db.session.add(event)
        db.session.commit()
        print(f'LOG: {input_register_email} register success!')
        return {'result': True,
                'info': f'{input_register_email} Register success!'}
    except Exception as e:
        print(f'LOG: {input_register_email} register failed(user is already exists)!')
        return {'result': False,
                'info': f'Register failed: user is already exists!'}


def user_login(**kwargs):
    input_user_email = kwargs['user_email']
    input_password = kwargs['password']
    # 输入数据格式校验

    # 数据库查表
    login_user = User.query.filter_by(email=input_user_email).first()
    if login_user:
        if login_user.password == input_password:
            print(f'LOG: {input_user_email} login success!')
            return {'result': True,
                    'info': 'Login success!'}
        else:
            print(f'LOG: {input_user_email} login failed(Wrong email or password)!')
            return {'result': False,
                    'info': 'Wrong email or password!'}
    else:
        print(f'LOG: {input_user_email} login failed(do not have this account)!')
        return {'result': False,
                'info': 'Don\'t have this account, please register!'}
