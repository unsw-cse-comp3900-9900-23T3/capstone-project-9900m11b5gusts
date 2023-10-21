#### week1
Familiar with the project
### week2
Learn and prepare for flask
test flask API function and familiar with flask_restx and sqlite3 db
### week3
monday-friday：
Build up a FontEnd(have signIn and signUp function) using react
a BackEnd(have login and register API function) and fix the cors technology issue  that can connected with fontEnd fetch response. 
Friday - Saturday：
Remake the backend's structure and fix the circular reference bug on Vlab, so that backend can run on Vlab.
### week4
monday-tuesday:
finished Authorization,when use API need token the backend provided.
API(/Authors/profile get):user can get profile information (email,username,identity,gender,city,suburb)
API(/Authors/profile post):user can update profile information(name, gender, city, suburb)
wednesday:
user can upload item(including item details)
user can see the item they uploaded.
Thursday：
overwrite all font end codes, using JOY UI to complete login register logout sidebar introduction page
Friday:
add token jwt access expired 1 hour and refresh 30 days
Saturday：
users can edit their item(can change column change 0 to 1 which means want to change, item name, item description.....), '' empty str means keep the original info.
all users can research item by keywords, order by price, and chose item want changed or not
Sunday：
Users can change the password by our service security code(we send code to email)
### week5
improve the reset password,user can receive and change by code in 2 minutes,in 2 minutes, any times try is fine in two minutes.Exceed two minute, send email again.
### week6
change the item database column people can select cash or exchange in trading_method.
all the item api is changed.
fix the delete item bug.
add page to the search items, each page has 10 records, this api also give the total records,font end should calculate how many pages should have
add item category API
add search other profile API
add search item by category
add owner_email in every item's json.
bug fixed, combine search item by keyword and filter category together
