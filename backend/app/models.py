from flask_jwt_extended import get_jwt_identity

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
    identity = db.Column(db.String(10), default='User')
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
    activity_name = db.Column(
        db.String(30), unique=True, default='activity name')
    status = db.Column(db.String(30), default='status')
    category = db.Column(db.String(30), default='category')
    overview = db.Column(db.String(1000), default='overview')
    detail = db.Column(db.String(1000), default='detail')
    image = db.Column(db.String(1000), default='image of activity')
    email = db.Column(db.Integer, db.ForeignKey('tb_user.email'))


class Topic(db.Model):
    __tablename__ = 'tb_topic'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.Integer, db.ForeignKey('tb_user.email'))
    activity_id = db.Column(db.Integer, db.ForeignKey('tb_activity.id'))
    image = db.Column(db.String(1000), default='image of activity')
    detail = db.Column(db.String(1000), default='detail')


class Comment(db.Model):
    __tablename__ = 'tb_comment'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    topic_id = db.Column(db.Integer, db.ForeignKey('tb_topic.id'))
    comment = db.Column(db.String(1000), default='This is the comment')
    email = db.Column(db.Integer, db.ForeignKey('tb_user.email'))


class Item(db.Model):
    __tablename__ = 'tb_item'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(30), db.ForeignKey(
        'tb_user.email'), index=True)
    image = db.Column(db.String(1000), default='image of Item')
    item_name = db.Column(db.String(30))
    item_desc = db.Column(db.String(1000))
    item_price = db.Column(db.Float)
    item_num = db.Column(db.Integer)  # item_last_num 剩余物品数量
    item_sold_num = db.Column(db.Integer, default=0)  # 卖出的物品数量
    class1 = db.Column(db.String(30))
    class2 = db.Column(db.String(30))
    class3 = db.Column(db.String(30))
    trading_method = db.Column(db.String(10), default='cash')
    exchange_item = db.Column(db.String(100), default='')
    change = db.Column(db.Boolean, default=False)
    time_stamp = db.Column(db.DateTime, default=datetime.datetime.now())


class Purchase(db.Model):
    __tablename__ = 'tb_purchase'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    item_id = db.Column(db.Integer, db.ForeignKey('tb_item.id'), index=True)
    item_name = db.Column(db.String(30))
    buyer_email = db.Column(
        db.String(30), db.ForeignKey('tb_user.email'), index=True)
    seller_email = db.Column(
        db.String(30), db.ForeignKey('tb_user.email'), index=True)
    purchase_amount = db.Column(db.Integer, default=0)
    status = db.Column(db.String(30), default="processing")
    finished = db.Column(db.Boolean, default=False)
    time_stamp = db.Column(db.DateTime, default=datetime.datetime.now())


class WishItem(db.Model):
    __tablename__ = 'tb_wishitem'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(30), db.ForeignKey(
        'tb_user.email'), index=True)
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


class Inventory(db.Model):
    __tablename__ = 'tb_inventory'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(30), db.ForeignKey(
        'tb_user.email'), index=True)
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
        msg = Message('5Gusts(Password Reset Request)',
                      sender='923519550@qq.com', recipients=[email])
        msg.body = '5Gusts Technology company:\n' + content + f'{code}'
        mail.send(msg)


def user_register(**kwargs):
    input_register_email = kwargs['register_email']
    input_username = kwargs['username']
    input_password = kwargs['password']
    input_identity = kwargs['identity']
    # 输入数据格式校验
    if input_identity != 'User':
        manager_code = ['zxcvb', 'asdfg', 'qwert']
        admin_code = ['poiuy', 'lkjhg', 'mnbvc']
        if input_identity in manager_code:
            temp_code = input_identity
            input_identity = 'manager'

            try:
                event = User(email=input_register_email, username=input_username, password=input_password,
                             identity=input_identity)
                db.session.add(event)
                db.session.commit()

                print('-----', input_register_email)
                print(f'LOG: {input_register_email} register success!')
                manager_code.remove(temp_code)
                return {'result': True,
                        'info': f'{input_register_email} Register success!'}
            except Exception as e:
                print(
                    f'LOG: {input_register_email} register failed(manager user is already exists) {e}!')
                return {'result': False,
                        'info': f'Register failed: user is already exists!'}

        elif input_identity in admin_code:
            temp_code = input_identity
            input_identity = 'administrator'
            try:
                event = User(email=input_register_email, username=input_username, password=input_password,
                             identity=input_identity)
                db.session.add(event)
                db.session.commit()
                admin_code.remove(temp_code)
                print(f'LOG: {input_register_email} register success!')
                return {'result': True, 'info': f'{input_register_email} Register success!'}
            except Exception as e:
                print(
                    f'LOG: {input_register_email} register failed(admin user is already exists){e}!')
                return {'result': False, 'info': f'Register failed: user is already exists!'}
        else:
            return {'result': False, 'info': 'invalid code!'}
    else:
        try:
            event = User(email=input_register_email, username=input_username, password=input_password,
                         identity=input_identity)
            db.session.add(event)
            db.session.commit()
            print(f'LOG: {input_register_email} register success!')

            return {'result': True, 'info': f'{input_register_email} Register success!'}
        except Exception as e:
            print(
                f'LOG: {input_register_email} register failed(user is already exists)!')
            return {'result': False, 'info': f'Register failed: user is already exists!'}


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
            print(
                f'LOG: {input_user_email} login failed(Wrong email or password)!')
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
            reset_code = PasswordReset(
                email=email, code=code, create_at=datetime.datetime.now())
            db.session.add(reset_code)
            db.session.commit()
            with current_app.app_context():
                send_email(
                    email, 'In order to reset your password,please fill your code:', code)
            return {'result': True, 'info': 'A password reset email has been sent to your email.'}
        except Exception as e:
            return {'result': False, 'info': f'{e}'}
    else:
        return {'result': False, 'info': 'Do not have this email in our account!'}


def reset_password(**kwargs):
    email = kwargs['email']
    code = kwargs['code']
    new_password = kwargs['new_password']
    user_ = PasswordReset.query.filter_by(email=email).order_by(
        PasswordReset.create_at.desc()).first()

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
    if user:
        return {'email': user.email,
                'username': user.username,
                'image': user.image,
                'identity': user.identity,
                'gender': user.gender,
                'state': user.state,
                'suburb': user.suburb,
                }
    else:
        return {}


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


@time_test
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
    # if kwargs['trading_method'] != 'cash' else ''
    input_exchange_item = kwargs['exchange_item']
    try:
        event = Item(email=input_email, image=input_item_image, item_name=input_item_name, item_desc=input_item_desc,
                     item_price=input_item_price, item_num=input_item_num, class1=input_class1, class2=input_class2,
                     class3=input_class3, trading_method=input_method, exchange_item=input_exchange_item, change=input_change, time_stamp=datetime.datetime.now())
        db.session.add(event)                            #
        db.session.commit()
        return {'result': True, 'info': 'insert item success'}
    except Exception as e:
        print(e)
        return {'result': False, 'info': e}


def get_personal_item(email):
    personal_items = Item.query.filter_by(email=email).all()
    if personal_items:
        temp_dict = {}
        user = User.query.filter_by(email=email).first()
        user_name = user.username
        for item in personal_items:
            temp_dict[item.id] = {
                'item_id': item.id,
                'owner_email': email,
                'username': user_name,
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
                # 将日期时间转换为字符串格式
                'time_stamp': item.time_stamp.strftime('%Y-%m-%d %H:%M:%S')
            }

        return {'result': True, 'info': temp_dict}
    else:
        return {'result': True, 'info': 'no item'}

# 修改的数量是哪一个？是剩余数量，还是卖出的数量，还是剩余数量+卖出的数量？


def update_personal_item(email, **kwargs):
    personal_item = Item.query.filter_by(
        email=email, id=int(kwargs['item_id'])).first()
    if personal_item:
        try:
            if kwargs['item_name']:
                personal_item.item_name = kwargs['item_name']
            if kwargs['description']:
                personal_item.item_desc = kwargs['description']
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
    personal_item = Item.query.filter_by(
        email=email, id=int(kwargs['item_id'])).first()
    if personal_item:
        db.session.delete(personal_item)
        db.session.commit()
        return {'result': True, 'info': 'delete success'}
    else:
        return {'result': False, 'info': 'do not have this item'}


def purchase_request(email, **kwargs):
    item_id = int(kwargs['item_id'])
    purchase_amount = int(kwargs['purchase_amount'])
    wanted_item = Item.query.filter_by(id=item_id).first()
    # 如果有物品则继续，没有物品则提示
    if wanted_item:
        seller_email = wanted_item.email
        item_name = wanted_item.item_name
        purchase_history = Purchase(buyer_email=email, seller_email=seller_email, item_id=item_id,
                                    purchase_amount=purchase_amount, item_name=item_name,
                                    time_stamp=datetime.datetime.now())
        db.session.add(purchase_history)
        db.session.commit()
        return {'result': True,
                'info': 'the purchase request is sending to seller, please wait for the seller response'}
    else:
        return {'result': False, 'info': 'this item is selling out'}

    # if wanted_item:
    #     if wanted_item.item_num - purchase_amount >= 0:
    #         # 查看是否有未完成的购买请求
    #         history = Purchase.query.filter_by(buyer_email=email).order_by(Purchase.time_stamp.desc()).first()
    #         if not history or (history and history.finished):
    #             # 在Purchase表中进行记录
    #             seller_email = wanted_item.email
    #             item_name = wanted_item.item_name
    #             purchase_history = Purchase(buyer_email=email, seller_email=seller_email, item_id=item_id,
    #                                         purchase_amount=purchase_amount, item_name=item_name, time_stamp=datetime.datetime.now())
    #             db.session.add(purchase_history)
    #             db.session.commit()
    #             return {'result': True,
    #                     'info': 'the purchase request is sending to seller, please wait for the seller response'}
    #         elif not history.finished:
    #             return {'result': False, 'info': 'you already have one purchase request, please waiting for previous request'}
    #
    #     else:
    #         # 物品数量不够
    #         return {'result': False, 'info': 'not enough item amount'}
    # else:
    #     return {'result': False, 'info': 'this item is selling out'}


def get_item_by_id(item_id):
    item = Item.query.filter_by(id=item_id).first()
    if item:
        item_dict = {}
        user = User.query.filter_by(email=item.email).first()
        user_name = user.username
        item_dict[item.id] = {
            'owner_email': item.email,
            'username': user_name,
            'item_id': item.id,
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
            # 将日期时间转换为字符串格式
            'time_stamp': item.time_stamp.strftime('%Y-%m-%d %H:%M:%S')
        }
        return {'result': True, 'info': item_dict}
    else:
        return {'result': True, 'info': {}}


def selling_history(email):
    seller_history = Purchase.query.filter_by(seller_email=email).all()
    if seller_history:
        history = {}
        for h in seller_history:
            buyer_name = User.query.filter_by(
                email=h.buyer_email).first().username
            seller_name = User.query.filter_by(
                email=h.seller_email).first().username
            history[h.id] = {
                "history_id": h.id,
                'item_id': h.item_id,
                'item_name': h.item_name,
                'buyer_email': h.buyer_email,
                'buyer_name': buyer_name,
                'seller_email': h.seller_email,
                'seller_name': seller_name,
                'purchase_amount': h.purchase_amount,
                'status': h.status,
                'finished': h.finished,
                'time_stamp': h.time_stamp.strftime('%Y-%m-%d %H:%M:%S')
            }
        return {'result': True, 'info': history}
    else:
        return {'result': True, 'info': {}}


def buying_history(email):
    buyer_history = Purchase.query.filter_by(buyer_email=email).all()
    if buyer_history:
        history = {}
        for h in buyer_history:
            buyer_name = User.query.filter_by(
                email=h.buyer_email).first().username
            seller_name = User.query.filter_by(
                email=h.seller_email).first().username
            history[h.id] = {
                "history_id": h.id,
                'item_id': h.item_id,
                'item_name': h.item_name,
                'buyer_email': h.buyer_email,
                'buyer_name': buyer_name,
                'seller_email': h.seller_email,
                'seller_name': seller_name,
                'purchase_amount': h.purchase_amount,
                'status': h.status,
                'finished': h.finished,
                'time_stamp': h.time_stamp.strftime('%Y-%m-%d %H:%M:%S')
            }
        return {'result': True, 'info': history}
    else:
        return {'result': True, 'info': {}}

# TODO
# 对于购买者，交易状态为processing的请求(历史记录)
# 对于卖家，交易状态为processing的请求（历史记录）


def buyer_process_request(email):
    buyer_process_histories = Purchase.query.filter_by(
        buyer_email=email, status='processing').all()
    if buyer_process_histories:
        history = {}
        for h in buyer_process_histories:
            buyer_name = User.query.filter_by(
                email=h.buyer_email).first().username
            seller_name = User.query.filter_by(
                email=h.seller_email).first().username
            history[h.id] = {
                "history_id": h.id,
                'item_id': h.item_id,
                'item_name': h.item_name,
                'buyer_email': h.buyer_email,
                'buyer_name': buyer_name,
                'seller_email': h.seller_email,
                'seller_name': seller_name,
                'purchase_amount': h.purchase_amount,
                'status': h.status,
                'finished': h.finished,
                'time_stamp': h.time_stamp.strftime('%Y-%m-%d %H:%M:%S')
            }
        return {'result': True, 'info': history}
    else:
        return {'result': True, 'info': {}}


def seller_process_request(email):
    seller_process_histories = Purchase.query.filter_by(
        seller_email=email, status='processing').all()
    if seller_process_histories:
        history = {}
        for h in seller_process_histories:
            buyer_name = User.query.filter_by(
                email=h.buyer_email).first().username
            seller_name = User.query.filter_by(
                email=h.seller_email).first().username
            history[h.id] = {
                "history_id": h.id,
                "item_id": h.item_id,
                "item_name": h.item_name,
                "buyer_email": h.buyer_email,
                "buyer_name": buyer_name,
                "seller_email": h.seller_email,
                "seller_name": seller_name,
                "purchase_amount": h.purchase_amount,
                "status": h.status,
                "finished": h.finished,
                "time_stamp": h.time_stamp.strftime('%Y-%m-%d %H:%M:%S')
            }
        return {'result': True, 'info': history}
    else:
        return {'result': True, 'info': {}}

# def check_trading_status(email):
#     buyer_request = Purchase.query.filter_by(buyer_email=email).order_by(Purchase.time_stamp.desc()).first()
#     seller_request = Purchase.query.filter_by(seller_email=email).order_by(Purchase.time_stamp.desc()).first()
#     if buyer_request and not buyer_request.finished:
#         if buyer_request.status == 'processing':
#             return {'result': False, 'info': 'In processing'}
#         elif buyer_request.status == 'reject':
#             buyer_request.finished = True
#             buyer_request.time_stamp = datetime.datetime.now()
#             db.session.commit()
#             return {'result': True, 'info': 'Seller reject your purchasing'}
#         elif buyer_request.status == 'approve':
#             buyer_request.finished = True
#             buyer_request.time_stamp = datetime.datetime.now()
#             db.session.commit()
#             return {'result': True, 'info': 'Seller approve your purchasing'}
#     elif seller_request and not seller_request.finished:
#         if seller_request.status == 'processing':
#             seller_email = seller_request.seller_email
#             item_name = seller_request.item_name
#             purchase_amount = seller_request.purchase_amount
#             return {'result': True, 'info': f'{seller_email} want to buy {purchase_amount} {item_name}'}
#         else:
#             return {'result': False, 'info': ''}
#     else:
#         return {'result': False, 'info': 'No new message'}


def handle_purchase_request(email, **kwargs):
    history_id = int(kwargs['history_id'])
    action = kwargs['action']
<<<<<<< HEAD
    item_request = Purchase.query.filter_by(seller_email=email, id=history_id).first()
=======
    item_request = Purchase.query.filter_by(
        seller_email=email, item_id=item_id).first()
>>>>>>> f4bf8e7da3a9976882f073dd2fd4b11ab7c6f9f6
    if item_request:
        item_id = int(item_request.item_id)
        if action:
            # 同意购买物品
            item_request.finished = True
            item_request.status = 'approved'
            item_request.time_stamp = datetime.datetime.now()
            selling_amount = item_request.purchase_amount
            db.session.commit()
            # 更新Item表数据
            item = Item.query.filter_by(id=item_id).first()
            item.item_num -= selling_amount
            item.item_sold_num += selling_amount
            if item.item_num == 0:
                db.session.delete(item)
            db.session.commit()
        else:
            # 不同意购买物品
            item_request.status = 'reject'
            item_request.finished = True
            item_request.time_stamp = datetime.datetime.now()
            db.session.commit()
        return {'result': True, 'info': 'you have handle the selling request'}
    else:
        return {'result': False, 'info': 'no this item'}

# def selling_request(email, action):
#     seller_request = Purchase.query.filter_by(seller_email=email).order_by(Purchase.time_stamp.desc()).first()
#     if seller_request and not seller_request.finished:
#         if action:
#             seller_request.status = 'approve'
#             # update the Item table, update the item amount
#             item_id = seller_request.item_id
#             item_name = seller_request.item_name
#             selling_amount = seller_request.purchase_amount
#             item = Item.query.filter_by(id=item_id).first()
#             new_item_amount = item.item_num - selling_amount
#             if new_item_amount:
#                 item.item_num = item.item_num - selling_amount
#                 item.time_stamp = datetime.datetime.now()
#                 db.session.commit()
#                 db.session.commit()
#                 return {'result': True, 'info': f'you sold {selling_amount} {item_name}'}
#             else:
#                 db.session.delete(item)
#                 db.session.commit()
#                 db.session.commit()
#                 return {'result': True, 'info': f'you sold {selling_amount} {item_name}, and this item is out'}
#         else:
#             seller_request.status = 'reject'
#             seller_request.time_stamp = datetime.datetime.now()
#             db.session.commit()
#             return {'result': True, 'info': f'you reject the purchase request'}
#
#     else:
#         return {'result': False, 'info': ''}


@time_test
def search_item(page, **kwargs):
    keyword = kwargs['keyword']
    price_sorted = kwargs['price_sorted']
    trading_method = kwargs['trading_method']
    change = kwargs['change']
    cls1 = kwargs['class1']
    cls2 = kwargs['class2']
    cls3 = kwargs['class3']
    p_dict = {
        'default': None,
        'asc': Item.item_price.asc(),
        'desc': Item.item_price.desc()
    }

    try:
        items = Item.query
        # 将排序条件应用到查询之前
        if price_sorted in p_dict:
            sort_condition = p_dict[price_sorted]
        else:
            # 默认排序条件
            sort_condition = None
        if cls1:
            items = items.filter(Item.class1 == cls1)
        if cls2:
            items = items.filter(Item.class2 == cls2)
        if cls3:
            items = items.filter(Item.class3 == cls3)
        query = items.filter(
            or_(
                # ilike means upper and lower is the same
                Item.item_name.ilike(f'%{keyword}%'),
                Item.item_desc.ilike(f'%{keyword}%'),
                # Item.class1.ilike(f'%{keyword}%'),
                # Item.class2.ilike(f'%{keyword}%'),
                # Item.class3.ilike(f'%{keyword}%')
            )
        )
        if trading_method != 'default':
            query = query.filter(Item.trading_method == trading_method)
        # sort_condition = p_dict[price_sorted]
        # query = query.order_by(sort_condition)
        print(query.all())
        query = query.filter(Item.change == change)
        page_size = 10
        offset = (page - 1) * page_size
        total_rows = query.count()
        s_items = query.order_by(sort_condition).offset(
            offset).limit(page_size).all()

        if s_items:
            item_dict = {'total_rows': total_rows}
            for item in s_items:
                # print(item, item.item_price)
                user = User.query.filter_by(email=item.email).first()
                user_name = user.username
                item_dict[item.id] = {
                    'owner_email': item.email,
                    'username': user_name,
                    'item_id': item.id,
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
                    # 将日期时间转换为字符串格式
                    'time_stamp': item.time_stamp.strftime('%Y-%m-%d %H:%M:%S')
                }
            # print(item_dict)
            return {'result': True, 'info': item_dict}
        else:

            return {'result': True, 'info': {}}

    except Exception as e:
        return {'result': False, 'info': f'invalid input{e}'}


def search_item_by_category(page, **kwargs):
    cls1 = kwargs['class1']
    cls2 = kwargs['class2']
    cls3 = kwargs['class3']
    items = Item.query
    if cls1:
        items = items.filter(Item.class1 == cls1)
    if cls2:
        items = items.filter(Item.class2 == cls2)
    if cls3:
        items = items.filter(Item.class3 == cls3)
    page_size = 10
    total_rows = items.count()
    offset = (page - 1) * page_size
    s_items = items.offset(offset).limit(page_size).all()
    if s_items:
        r = {}
        for item in s_items:
            r[item.id] = {
                'owner_email': item.email,
                'item_id': item.id,
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
                # 将日期时间转换为字符串格式
                'time_stamp': item.time_stamp.strftime('%Y-%m-%d %H:%M:%S')
            }
        return {'result': True, 'info': {'total_rows': total_rows, 'items': r}}
    else:
        return {'result': True, 'info': {}}


def insert_wish_list(email, **kwargs):
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
    print('wishlist')
    try:
        event = WishItem(email=input_email, image=input_item_image, item_name=input_item_name, item_desc=input_item_desc,
                         item_price=input_item_price, item_num=input_item_num, class1=input_class1, class2=input_class2,
                         class3=input_class3, trading_method=input_method, exchange_item=input_exchange_item, change=input_change, time_stamp=datetime.datetime.now())
        db.session.add(event)
        db.session.commit()
        return {'result': True, 'info': 'insert item success'}
    except Exception as e:
        print(e)
        return {'result': False, 'info': f'{e}'}


def update_wish_list(email, **kwargs):
    input_id = kwargs['item_id']
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
        wish_list_item = WishItem.query.filter_by(
            email=email, id=input_id).first()
        if input_item_image:
            wish_list_item.image = input_item_image
        if input_item_name:
            wish_list_item.item_name = input_item_name
        if input_item_desc:
            wish_list_item.item_desc = input_item_desc
        if input_item_price:
            wish_list_item.item_price = float(input_item_price)
        if input_item_num:
            wish_list_item.item_nums = int(input_item_num)
        if input_class1:
            wish_list_item.class1 = input_class1
        if input_class2:
            wish_list_item.class2 = input_class2
        if input_class3:
            wish_list_item.class3 = input_class3
        if input_method:
            wish_list_item.trading_method = input_method
        if input_exchange_item:
            wish_list_item.exchange_item = input_exchange_item
        if input_change:
            wish_list_item.change = input_change
        wish_list_item.time_stamp = datetime.datetime.now()
        db.session.commit()
        return {'result': True, 'info': 'update wish item success!'}
    except Exception as e:
        return {'result': False, 'info': f'{e}'}


def delete_wish_list(email, **kwargs):
    input_id = kwargs['item_id']
    wish_list_item = WishItem.query.filter_by(
        email=email, id=int(input_id)).first()
    if wish_list_item:
        db.session.delete(wish_list_item)
        db.session.commit()
        return {'result': True, 'info': 'delete wish item success!'}
    else:
        return {'result': False, 'info': 'no wish item'}


def check_wish_item(email):
    if email:
        wish_list_items = WishItem.query.filter_by(email=email).all()
    else:
        wish_list_items = WishItem.query.all()
    try:
        if wish_list_items:
            item_dict = {}
            for wish_item in wish_list_items:
                user = User.query.filter_by(email=wish_item.email).first()
                user_name = user.username
                item_dict[wish_item.id] = {
                    'owner_email': wish_item.email,
                    'username': user_name,
                    'item_id': str(wish_item.id),
                    'item_name': wish_item.item_name,
                    'image': wish_item.image,
                    'item_price': str(wish_item.item_price),
                    'item_num': str(wish_item.item_num),
                    'item_desc': wish_item.item_desc,
                    'trading_method': wish_item.trading_method,
                    'exchange_item': wish_item.exchange_item,
                    'change': str(wish_item.change),
                    'class1': wish_item.class1,
                    'class2': wish_item.class2,
                    'class3': wish_item.class3,
                    # 将日期时间转换为字符串格式
                    'time_stamp': wish_item.time_stamp.strftime('%Y-%m-%d %H:%M:%S')
                }
            return {'result': True, 'info': item_dict}
        else:
            return {'result': True, 'info': 'no item'}
    except Exception as e:
        return {'result': False, 'info': f'{e}'}


def insert_inventory(email, **kwargs):
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
    print('inventory')
    try:
        event = Inventory(email=input_email, image=input_item_image, item_name=input_item_name, item_desc=input_item_desc,
                          item_price=input_item_price, item_num=input_item_num, class1=input_class1, class2=input_class2,
                          class3=input_class3, trading_method=input_method, exchange_item=input_exchange_item, change=input_change, time_stamp=datetime.datetime.now())
        db.session.add(event)
        db.session.commit()
        return {'result': True, 'info': 'insert item success'}
    except Exception as e:
        print(e)
        return {'result': False, 'info': e}


'''--------------------------------'''


def search_activity(page, **kwargs):

    activity_name = kwargs['activity_name']
    category = kwargs['category']
    status = kwargs['status']
    if len(activity_name) == 0:
        activity_name = "*****"
    if len(category) == 0:
        category = "*****"
    if len(status) == 0:
        status = "*****"
    activity_infor = Activity.query.filter(
        or_(
            Activity.activity_name.ilike(f'{activity_name}'),
            Activity.category.ilike(f'{category}'),
            Activity.status.ilike(f'{status}')
        )
    )

    page_size = 10
    offset = (page - 1) * page_size
    total_rows = activity_infor.count()
    activities = activity_infor.offset(offset).limit(page_size).all()
    if activities:
        r = {}
        for activity in activities:
            r[activity.id] = {
                'activity_name': activity.activity_name,
                'status': activity.status,
                'category': activity.category,
                'overview': activity.overview,
                'detail': activity.detail
            }
        return {'result': True, 'info': {'total_rows': total_rows, 'activities': r}}
    else:
        return {'result': True, 'info': {}}


def create_activity(email, **kwargs):
    activity_name = kwargs['activity_name']
    category = kwargs['category']

    activity = Activity.query.filter_by(
        activity_name=activity_name, category=category).first()

    if activity:
        return {'result': False, 'info': f'The activity exist.'}
    else:
        try:
            activity_name = kwargs['activity_name']
            status = 0
            category = kwargs['category']
            overview = kwargs['overview']
            detail = kwargs['detail']
            image = kwargs['image']
            activity = Activity(activity_name=activity_name, status=status, category=category,
                                overview=overview, detail=detail, image=image, email=email)
            db.session.add(activity)
            db.session.commit()
            return {'result': True, 'info': 'Create the activity successfully'}
        except Exception as e:
            return {'result': False, 'info': f'Failed to create the activity'}


def delete_activity(email, **kwargs):
    activity_name = kwargs['activity_name']
    category = kwargs['category']

    activity = Activity.query.filter_by(
        activity_name=activity_name, category=category).first()
    email = get_jwt_identity()
    identity = get_user_identity(email)
    if activity:
        if activity.email != email and identity != "administrator":
            return {'result': False,
                    'info': 'You don\'t have the permission to delete the activity which is not created by you!'}
        topics = Topic.query.filter_by(activity_id=activity.id).all()
        if topics:
            for topic in topics:
                comments = Comment.query.filter_by(topic_id=topic.id).all()
                if comments:
                    for comment in comments:
                        db.session.delete(comment)
                db.session.delete(topic)
        db.session.delete(activity)
        db.session.commit()
        return {'result': True, 'info': 'delete success'}
    else:
        return {'result': False, 'info': 'do not have this activity'}


def get_user_identity(email):
    user = User.query.filter_by(email=email).first()
    return user.identity


def update_activity(email, **kwargs):
    # activity update
    activity_name = kwargs['activity_name']
    status = kwargs['status']
    category = kwargs['category']
    overview = kwargs['overview']
    detail = kwargs['detail']
    try:
        activity = Activity.query.filter_by(
            activity_name=activity_name).first()
        if activity.email != email:
            return {'result': False, 'info': f'You don\'t have permission to update activities which are not created by you!'}
        if activity:
            if activity.status == '0' and (status == '1' or status == '2'):
                return {'result': False, 'info': f'Administrator has not approved the activity, you can not proceed !'}
            activity.activity_name = activity_name
            activity.status = status
            activity.category = category
            activity.overview = overview
            activity.detail = detail
            db.session.commit()
            return {'result': True, 'info': f'update activity success'}
    except Exception as e:
        return {'result': False, 'info': f'Failed to update activity'}


def show_activities_infor(page, page_size):
    activity_infor = Activity.query.filter()
    # page_size = 10
    offset = (page - 1) * page_size
    total_rows = activity_infor.count()
    activities = activity_infor.offset(offset).limit(page_size).all()
    if len(activities) != 0:
        r = {}
        for activity in activities:
            r[activity.id] = {
                'activity_name': activity.activity_name,
                'category': activity.category,
                'overview': activity.overview,
                'detail': activity.detail,
                'image': activity.image,
                'status': activity.status,
                'email': activity.email
            }
        return {'result': True, 'info': {'total_rows': total_rows, 'activities': r}}
    else:
        return {'result': True, 'info': {'activities': '', 'total_rows': 0}}


def show_user_identity(page, page_size):
    user_infor = User.query.filter()
    # page_size = 10
    offset = (page - 1) * page_size
    total_rows = user_infor.count()
    users = user_infor.offset(offset).limit(page_size).all()
    if users:
        r = {}
        for user in users:
            r[user.id] = {
                'image': user.image,
                'username': user.username,
                'identity': user.identity,
                'email': user.email
            }
        return {'result': True, 'info': {'total_rows': total_rows, 'users': r}}
    else:
        return {'result': True, 'info': {'users': '', 'total_rows': 0}}


def delete_user(**kwargs):
    user_email = kwargs['user_email']

    user = User.query.filter_by(email=user_email).first()
    passwordReset = PasswordReset.query.filter_by(email=user_email).first()
    item = Item.query.filter_by(email=user_email)
    activity = Activity.query.filter_by(email=user_email)

    if passwordReset:
        db.session.delete(passwordReset)
        db.session.commit()

    if item:
        for u in item:
            db.session.delete(u)
        db.session.commit()

    if activity:
        for u in activity:
            db.session.delete(u)
        db.session.commit()

    if user:
        db.session.delete(user)
        db.session.commit()
        return {'result': True, 'info': 'delete success'}
    else:
        return {'result': False, 'info': 'fail to delete the user'}


def modify_permission(**kwargs):
    # user permission update
    user_email = kwargs['email']
    identity = kwargs['identity']

    try:
        user = User.query.filter_by(email=user_email).first()
        if user:
            user.email = user_email
            user.identity = identity
            db.session.commit()
            return {'result': True, 'info': f'update user permission success'}
    except Exception as e:
        return {'result': False, 'info': f'Failed to update user permission'}


def approve_activity(**kwargs):
    name = kwargs['name']
    category = kwargs['category']
    status = kwargs['status']
    try:
        activity = Activity.query.filter_by(
            activity_name=name, category=category).first()
        if activity:
            activity.status = status
            db.session.commit()
            return {'result': True, 'info': f'Approve the activity successfully'}
    except Exception as e:
        return {'result': False, 'info': f'Failed to approve the activity'}


def create_topic(email, **kwargs):
    try:
        activityId = kwargs['activityId']
        detail = kwargs['detail']
        image = kwargs['image']
        topic = Topic(activity_id=activityId, email=email,
                      detail=detail, image=image)
        db.session.add(topic)
        db.session.commit()
        topicId = topic.id
        return {'result': True, 'info': 'Create the topic successfully', 'topicId': topicId}
    except Exception as e:
        return {'result': False, 'info': f'Failed to create the topic'}


def update_topic(email, **kwargs):
    # topic update
    topicId = kwargs['topicId']
    detail = kwargs['detail']
    image = kwargs['image']
    try:
        topic = Topic.query.filter_by(
            id=topicId).first()
        if topic.email != email:
            return {'result': False, 'info': f"You don't have priviledge!"}
        topic.detail = detail
        topic.image = image
        db.session.commit()
        return {'result': True, 'info': f'Update topic success'}
    except Exception as e:
        return {'result': False, 'info': f'Failed to update topic'}


def delete_topic(email, identity, **kwargs):
    topicId = kwargs['topicId']
    try:
        topic = Topic.query.filter_by(
            id=topicId).first()
        topic_email = topic.email
        if topic_email == email or identity == "manager" or identity == "administrator":
            comments = Comment.query.filter_by(topic_id=topicId).all()
            if comments:
                for comment in comments:
                    db.session.delete(comment)
            db.session.delete(topic)
            db.session.commit()
            return {'result': True, 'info': f'Delete topic success'}
        else:
            return {'result': False, 'info': f"You don't have priviledge!"}
    except Exception as e:
        return {'result': False, 'info': f'Failed to delete topic'}


def comment_topic(email, **kwargs):
    topicId = kwargs['topicId']
    comment = kwargs['comment']
    try:
        comment = Comment(topic_id=topicId, comment=comment, email=email)
        db.session.add(comment)
        db.session.commit()
        return {'result': True, 'info': 'Create the comment successfully', 'commentId': comment.id}
    except Exception as e:
        return {'result': False, 'info': f'Failed to create the topic'}


def show_topic_detail(activity_id, page, page_size):
    offset = (page - 1) * page_size

    try:
        activity = Activity.query.filter_by(id=activity_id).first()
        activity_dict = {}
        if activity:
            topics_infor = Topic.query.filter_by(activity_id=activity.id)
            total_rows = topics_infor.count()
            topics = topics_infor.offset(offset).limit(page_size).all()
            if topics:
                comment_dict = {}
                for topic in topics:
                    topic_publisher = User.query.filter_by(
                        email=topic.email).first()
                    comments = Comment.query.filter_by(topic_id=topic.id).all()
                    if comments:
                        comments_infor = []
                        for comment in comments:
                            comment_user = User.query.filter_by(
                                email=comment.email).first()
                            inner_comment = {
                                'id': comment.id,
                                'email': comment.email,
                                'avatar': comment_user.image,
                                'comment': comment.comment
                            }
                            comments_infor.append(inner_comment)
                        comment_dict[topic.id] = comments_infor

                    activity_dict[topic.id] = {
                        'email': topic.email,
                        'user_avatar': topic_publisher.image,
                        'detail': topic.detail,
                        'image': topic.image,
                        'comments': comment_dict[topic.id]
                    }

        return {'result': True, 'info': {'total_rows': total_rows, 'topic': activity_dict}}
    except Exception as e:
        return {'result': False, 'info': {'total_rows': 0}}


def delete_comment(email, comment_id):
    # Only users who comment, topic owner, manager owner and administrator can delete the comment
    comment = Comment.query.filter_by(id=comment_id).first()
    if comment:
        topic = Topic.query.filter_by(id=comment.topic_id).first()
        activity = Activity.query.filter_by(id=topic.activity_id).first()
        user = User.query.filter_by(email=email).first()
        if email != comment.email and email != topic.email and email != activity.email and user.identity != "manager" and user.identity != "administrator":
            return {'result': False, 'info': "You don't have the privilege to delete the comment!"}
    try:
        db.session.delete(comment)
        db.session.commit()
        return {'result': True, 'info': f'Delete comment success'}
    except Exception as e:
        return {'result': False, 'info': f'Fail to delete the comment'}
