from .extensions import db, mail
from sqlalchemy import or_
from flask import current_app
from flask_mail import Message
import random
import datetime


class User(db.Model):
    __tablename__ = 'tb_user'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(30), unique=True, index=True)
    image = db.Column(db.String(1000), default='image of user')
    username = db.Column(db.String(30), unique=False, index=True)
    password = db.Column(db.String(30))
    identity = db.Column(db.String(10), default='user')
    gender = db.Column(db.String(10), default='male')
    state = db.Column(db.String(30), default='state')
    suburb = db.Column(db.String(30), default='suburb')


class PasswordReset(db.Model):
    __tablename__ = 'tb_passReset'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.Integer, db.ForeignKey('tb_user.email'))
    code = db.Column(db.String(100))
    create_at = db.Column(db.DateTime, default=datetime.datetime.now())

class Activity(db.Model):
    __tablename__ = 'tb_activity'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    activity_name = db.Column(db.String(30), unique=True, default='activity name')
    status = db.Column(db.String(30), default='status')
    category = db.Column(db.String(30), default='category')
    overview = db.Column(db.String(1000), default='overview')
    detail = db.Column(db.String(1000), default='detail')

class Item(db.Model):
    __tablename__ = 'tb_item'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(30), db.ForeignKey('tb_user.email'), index=True)
    image = db.Column(db.String(1000), default='image of Item')
    item_name = db.Column(db.String(30))
    item_desc = db.Column(db.String(1000))
    item_price = db.Column(db.Float)
    item_num = db.Column(db.Integer)
    class1 = db.Column(db.String(30))
    class2 = db.Column(db.String(30))
    class3 = db.Column(db.String(30))
    trading_method = db.Column(db.String(10), default='cash')
    exchange_item = db.Column(db.String(100), default='')
    change = db.Column(db.Boolean, default=False)
    time_stamp = db.Column(db.DateTime, default=datetime.datetime.now())


'''----------tools---------'''


class MyException(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)


def exceed_time(last_time):
    cur_time = datetime.datetime.now()
    dif_time = cur_time - last_time
    if dif_time.total_seconds() / 60 > 2:
        raise MyException('time exceed 2 minutes.')


def time_test(fn):
    def wrapper(*args, **kwargs):
        sta_time = datetime.datetime.now()
        ret = fn(*args, **kwargs)
        fin_time = datetime.datetime.now()
        diff_time = fin_time - sta_time
        print(f'{fn.__name__} spend {diff_time.total_seconds()}s')
        return ret
    return wrapper


'''------func----'''


@time_test
def send_email(email, content, code):
    with current_app.app_context():
        mail.connect()
        msg = Message('5Gusts(Password Reset Request)', sender='923519550@qq.com', recipients=[email])
        msg.body = '5Gusts Technology company:\n' + content + f'{code}'
        mail.send(msg)


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


def forget_pass(email):
    user = User.query.filter_by(email=email).first()
    if user:
        try:
            code = ''.join([str(random.randint(0, 9)) for _ in range(6)])
            reset_code = PasswordReset(email=email, code=code, create_at=datetime.datetime.now())
            db.session.add(reset_code)
            db.session.commit()
            with current_app.app_context():
                send_email(email, 'In order to reset your password,please fill your code:', code)
            return {'result': True, 'info': 'A password reset email has been sent to your email.'}
        except Exception as e:
            return {'result': False, 'info': f'{e}'}
    else:
        return {'result': False, 'info': 'Do not have this email in our account!'}


def reset_password(**kwargs):
    email = kwargs['email']
    code = kwargs['code']
    new_password = kwargs['new_password']
    user_ = PasswordReset.query.filter_by(email=email).order_by(PasswordReset.create_at.desc()).first()

    if user_:
        try:
            exceed_time(user_.create_at)
            if user_.code == code:
                # 修改密码
                user = User.query.filter_by(email=email).first()
                user.password = new_password
                db.session.commit()
                # delete PasswordReset email
                return {'result': True, 'info': 'Change password success'}
            else:
                return {'result': False, 'info': 'wrong code'}
        except Exception as e:
            return {'result': False, 'info': f'wrong: {e}'}
        except MyException('TimeExceed Exception') as e:
            return {'result': False, 'info': f'{e}'}

    else:
        return {'result': False, 'info': 'This email do not reset email.'}


def get_profile(email):
    user = User.query.filter_by(email=email).first()
    return {'email': user.email,
            'username': user.username,
            'image': user.image,
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
    input_image = kwargs['image']
    try:
        user = User.query.filter_by(email=email).first()
        if user:
            user.username = input_username
            user.state = input_state
            user.suburb = input_suburb
            user.gender = input_gender
            user.image = input_image
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
    input_item_image = kwargs['image']
    input_item_name = kwargs['item_name']
    input_item_desc = kwargs['description']
    input_item_price = float(kwargs['price'])
    input_item_num = int(kwargs['num'])
    input_class1 = kwargs['class1']
    input_class2 = kwargs['class2']
    input_class3 = kwargs['class3']
    input_method = kwargs['trading_method']
    input_change = kwargs['change']
    input_exchange_item = kwargs['exchange_item'] if kwargs['trading_method'] != 'cash' else ''
    try:
        event = Item(email=input_email, image=input_item_image, item_name=input_item_name, item_desc=input_item_desc,
                     item_price=input_item_price, item_num=input_item_num, class1=input_class1, class2=input_class2,
                     class3=input_class3, trading_method=input_method, exchange_item=input_exchange_item, change=input_change, time_stamp=datetime.datetime.now())
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
                'image': item.image,
                'item_price': str(item.item_price),
                'item_num': str(item.item_num),
                'item_desc': item.item_desc,
                'class1': item.class1,
                'class2': item.class2,
                'class3': item.class3,
                'trading_method': item.trading_method,
                'exchange_item': item.exchange_item,
                'change': item.change,
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
                personal_item.item_price = float(kwargs['price'])
            if kwargs['num']:
                personal_item.item_num = int(kwargs['num'])
            if kwargs['class1']:
                personal_item.class1 = kwargs['class1']
            if kwargs['class2']:
                personal_item.class2 = kwargs['class2']
            if kwargs['class3']:
                personal_item.class3 = kwargs['class3']
            if kwargs['trading_method']:
                personal_item.trading_method = kwargs['trading_method']
            if kwargs['exchange_item']:
                personal_item.exchange_item = kwargs['exchange_item']
            if kwargs['change']:
                personal_item.change = kwargs['change']
            if kwargs['image']:
                personal_item.image = kwargs['image']
            personal_item.time_stamp = datetime.datetime.now()
            # if number = 0 , delete item
            if personal_item.item_num <= 0:
                db.session.delete(personal_item)
            db.session.commit()

            return {'result': True, 'info': 'update personal item success'}
        except Exception as e:
            return {'result': False, 'info': f'the input is not correct{e}'}

    else:
        return {'result': False, 'info': 'no this item'}


def delete_personal_item(email, **kwargs):
    personal_item = Item.query.filter_by(email=email, id=int(kwargs['item_id'])).first()
    print(personal_item)
    if personal_item:
        db.session.delete(personal_item)
        db.session.commit()
        return {'result': True, 'info': 'delete success'}
    else:
        return {'result': False, 'info': 'do not have this item'}


def search_item(page, **kwargs):
    keyword = kwargs['keyword']
    price_sorted = kwargs['price_sorted']
    trading_method = kwargs['trading_method']
    change = kwargs['change']
    p_dict = {
        'default': None,
        'asc': Item.item_price.asc(),
        'desc': Item.item_price.desc()
    }
    try:
        query = Item.query.filter(
            or_(
                Item.item_name.ilike(f'%{keyword}%'),  # ilike means upper and lower is the same
                Item.item_desc.ilike(f'%{keyword}%'),
                Item.class1.ilike(f'%{keyword}%'),
                Item.class2.ilike(f'%{keyword}%'),
                Item.class3.ilike(f'%{keyword}%')
            )
        )
        if trading_method != 'default':
            query = query.filter(Item.trading_method == trading_method)
        sort_condition = p_dict[price_sorted]
        query = query.order_by(sort_condition)
        print(query.all())
        query = query.filter(Item.change == change)
        page_size = 10
        offset = (page - 1) * page_size
        total_rows = query.count()
        s_items = query.offset(offset).limit(page_size).all()

        if s_items:
            item_dict = {'total_rows': total_rows}
            for item in s_items:
                item_dict[item.id] = {
                    'item_name': item.item_name,
                    'image': item.image,
                    'item_price': str(item.item_price),
                    'item_num': str(item.item_num),
                    'item_desc': item.item_desc,
                    'trading_method': item.trading_method,
                    'exchange_item': item.exchange_item,
                    'change': str(item.change),
                    'class1': item.class1,
                    'class2': item.class2,
                    'class3': item.class3,
                    'time_stamp': item.time_stamp.strftime('%Y-%m-%d %H:%M:%S')  # 将日期时间转换为字符串格式
                }
            return {'result': True, 'info': item_dict}
        else:

            return {'result': True, 'info': {}}

    except Exception as e:
        return {'result': False, 'info': f'invalid input{e}'}

def search_activity(**kwargs):
    activity_name = kwargs['activity_name']
    category = kwargs['category']

    activity = Activity.query.filter_by(activity_name=activity_name,category=category).first()

    if activity:
        activity_dict = {'activity_name': activity.activity_name,
                'status': activity.status,
                'category': activity.category,
                'overview': activity.overview,
                'detail': activity.detail
                }
        return { 'result': True, 'activity':activity_dict }
    else:
        return { 'result': False, 'info': f'The activity does not exist.'}




def create_activity(**kwargs):
    activity_name = kwargs['activity_name']
    category = kwargs['category']

    activity = Activity.query.filter_by(activity_name=activity_name,category=category).first()

    if activity:
        return { 'result': False,'info': f'The activity exist.' }
    else:
        try:
            activity_name = kwargs['activity_name']
            status = kwargs['status']
            category = kwargs['category']
            overview = kwargs['overview']
            detail = kwargs['detail']
            activity = Activity(activity_name=activity_name, status=status, category=category,
                         overview=overview,detail=detail)
            db.session.add(activity)
            db.session.commit()
            return { 'result': True,'info':'Create the activity successfully'}
        except Exception as e:
            return { 'result': False,'info': f'Failed to create the activity'}


def delete_activity(**kwargs):
    activity_name = kwargs['activity_name']
    category = kwargs['category']

    activity = Activity.query.filter_by(activity_name=activity_name,category=category).first()

    if activity:
        db.session.delete(activity)
        return {'result': True, 'info': 'delete success'}
    else:
        return {'result': False, 'info': 'do not have this item'}

def get_user_identity(email):
    user = User.query.filter_by(email=email).first()
    return user.identity


def update_activity(**kwargs):
    # activity update
    activity_name = kwargs['activity_name']
    status = kwargs['status']
    category = kwargs['category']
    overview = kwargs['overview']
    detail = kwargs['detail']
    try:
        activity = Activity.query.filter_by(activity_name=activity_name).first()
        if activity:
            activity.activity_name = activity_name
            activity.status = status
            activity.category = category
            activity.overview = overview
            activity.detail = detail
            db.session.commit()
            return {'result': True, 'info': f'update activity success'}
    except Exception as e:
        return {'result': False, 'info': f'Failed to update activity'}




