from .extensions import db
import datetime


class User(db.Model):
    __tablename__ = 'tb_user'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(30), unique=True, index=True)
    username = db.Column(db.String(30), unique=False, index=True)
    password = db.Column(db.String(30))
    identity = db.Column(db.String(10), default='user')
    gender = db.Column(db.String(10), default='male')
    state = db.Column(db.String(30), default='state')
    suburb = db.Column(db.String(30), default='suburb')


class Item(db.Model):
    __tablename__ = 'tb_item'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(30), db.ForeignKey('tb_user.email'), index=True)
    item_name = db.Column(db.String(30))
    item_desc = db.Column(db.String(1000))
    item_price = db.Column(db.Float)
    item_num = db.Column(db.Integer)
    class1 = db.Column(db.String(30))
    class2 = db.Column(db.String(30))
    class3 = db.Column(db.String(30))
    change = db.Column(db.Integer, default=0)
    time_stamp = db.Column(db.DateTime, default=datetime.datetime.now())


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


def get_profile(email):
    user = User.query.filter_by(email=email).first()
    return {'email': user.email,
            'username': user.username,
            'identity': user.identity,
            'gender': user.gender,
            'state': user.state,
            'suburb': user.suburb,
            }


def update_profile(email, **kwargs):
    # user profile update
    input_username = kwargs['username']
    input_state = kwargs['state']
    input_suburb = kwargs['suburb']
    input_gender = kwargs['gender']
    try:
        user = User.query.filter_by(email=email).first()
        if user:
            user.username = input_username
            user.state = input_state
            user.suburb = input_suburb
            user.gender = input_gender
            db.session.commit()
            return {'result': True, 'info': 'update profile success'}
        else:
            print(f'LOG: User with email {email} not found')
            return {'result': False, 'info': f'User with email {email} not found'}

    except Exception as e:
        print(f'LOG: Failed to update city for user with email {email}')
        return {'result': False, 'info': f'Failed to update city for user with email {email}'}


def insert_item(email, **kwargs):
    input_email = email
    input_item_name = kwargs['item_name']
    input_item_desc = kwargs['description']
    input_item_price = float(kwargs['price'])
    input_item_num = int(kwargs['num'])
    input_class1 = kwargs['class1']
    input_class2 = kwargs['class2']
    input_class3 = kwargs['class3']
    try:
        event = Item(email=input_email, item_name=input_item_name, item_desc=input_item_desc,
                     item_price=input_item_price, item_num=input_item_num, class1=input_class1, class2=input_class2,
                     class3=input_class3)
        db.session.add(event)
        db.session.commit()
        return {'result': True, 'info': 'insert item success'}
    except Exception as e:
        print(e)
        return {'result': False, 'info': e}


def get_personal_item(email):
    personal_items = Item.query.filter_by(email=email).all()
    if personal_items:
        temp_dict = {}
        for item in personal_items:
            temp_dict[item.id] = {
                'item_name': item.item_name,
                'item_price': str(item.item_price),
                'item_num': str(item.item_num),
                'item_desc': item.item_desc,
                'change': str(item.change),
                'class1': item.class1,
                'class2': item.class2,
                'class3': item.class3,
                'time_stamp': item.time_stamp.strftime('%Y-%m-%d %H:%M:%S')  # 将日期时间转换为字符串格式
            }
        return {'result': True, 'info': temp_dict}
    else:
        return {'result': True, 'info': 'no item'}


def update_personal_item(email, **kwargs):
    personal_item = Item.query.filter_by(email=email, id=int(kwargs['item_id'])).first()
    if personal_item:
        try:
            if kwargs['item_name']:
                personal_item.item_name = kwargs['item_name']
            if kwargs['description']:
                personal_item.desc = kwargs['description']
            if kwargs['price']:
                personal_item.price = float(kwargs['price'])
            if kwargs['num']:
                personal_item.item_num = int(kwargs['num'])
            if kwargs['class1']:
                personal_item.class1 = kwargs['class1']
            if kwargs['class2']:
                personal_item.class2 = kwargs['class2']
            if kwargs['class3']:
                personal_item.class3 = kwargs['class3']
            if kwargs['change']:
                personal_item.change = int(kwargs['change'])
            personal_item.time_stamp = datetime.datetime.now()
            db.session.commit()

            return {'result': True, 'info': 'update personal item success'}
        except Exception as e:
            return {'result': False, 'info': f'the input is not correct{e}'}

    else:
        return {'result': False, 'info': 'no this item'}



