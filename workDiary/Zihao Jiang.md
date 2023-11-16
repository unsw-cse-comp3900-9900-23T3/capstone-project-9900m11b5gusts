The diary work is all my individual work, not us.
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
bug fixed,but no idea about sorting price bug.
Add wishlist API
Add inventory API
Add manager & admin code
### Week 7
Finish the wishlist update API
Finish the wishlist delete API
Finish the wishlist check API(all user and specific user)
### Week8
Finished the checkTradingStatus API
Finished the purchaseItem API
Finished the purchaseRequest API
First, both user can use checkTradingStatus API after register or login(must have token)
Then, user1 want to buy user2's pen, user2 can get the message from checkTradingStatus API
and can action(agree or disagree).
Some conditions:buyer have to wait for the seller response, if seller is not response(seller do not disagree or agree)
buyer can not buy another item.Another thing is buyer can not buy himself item(might cause bugs)
buyer buy item can have some tips by calling purchaseItem API such as amount exceed the seller have... 
### week9
Finished:
getBuyerProcessHistory API;
getBUyingHistory API;
getSellerProcessHistory API;
getSellingHistory API;
purchaseItem API;
handlePurchaseRequest API;
These APIs can handle the purchase & purchase history function
Add buyer_name & seller_name to the 4 histories;
Add a getItemByID API that can search item by item_id
Fix the multiple item purchase request, using purchase history primary key to identify the specific purchase history
Add item detail to 4 histories API
Get Selling and Buying history for all users
all the item getting method is return item by time_stamp desc 
YOLOv8:add an API can predict image class(Luna, Harry, Lucius, Dumbledore),the model is training by custom dataset
The training detail see in 'https://colab.research.google.com/drive/1HG50UD_VzIx8RAixuehCxzCZ6nIqkriC#scrollTo=0NuacHYRQFov'
### week10
write report's database part.
add requirement.txt.
finished the report's system Architecture part.
finished the report's challenge implementation part.
finished the report's system setup part.
Add some comments on code.