### Background 

The popularity of collectible campaigns by major retailers like Woolworths and Coles has led to a growing trend of customers engaging in collecting and trading items to complete sets, fostering a vibrant subculture. To enhance customer engagement, a Collectables Exchange Management System was launched. This system provides a specialized platform that simplifies the process of trading and swapping collectibles, thereby improving the overall consumer experience and increasing participation in collecting events.

### Purpose & Features

The system is designed to offer users a seamless web platform for trading and exchanging
collectibles among themselves. This elevates the overall customer experience and
encourages participation in collectible campaigns.

![image](https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m11b5gusts/assets/135929686/cce1ba1c-2bc0-433e-9a3a-abdc1162df2c)

Our system contains 11 major functionalities outlined above as Epics on Jira. Incorporating
these features not only aligns our product with existing options but also grants it a distinctive
edge with innovative functionalities.

#### Sprint 1

![image](https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m11b5gusts/assets/135929686/ed078936-b9cc-482c-82e8-b489dcbc231a)

In Sprint 1, we implement foundational web functionalities such as user creation, passwordmodification, recording types and quantities of owned collectibles, and searching for other users'collectibles.

#### Sprint 2

![image](https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m11b5gusts/assets/135929686/1d82f155-1816-43bd-b678-70afb0e56c29)

In Sprint 2, our focus shifts towards refining the details of the website. For instance, we willincorporate a location feature, allowing nearby users to connect with each other. Additionally,on the Campaign Manager's page, managers will be able to initiate and create newcampaigns.

#### Sprint 3

![image](https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m11b5gusts/assets/135929686/a9d8bd6d-32f6-434c-a4aa-952806f19774)

In Sprint 3, we will implement some advanced features. For instance, Campaign Managerscan gain deeper insights into customer engagement, exchange patterns, and popularcollectibles by viewing the analytics results of campaigns. Administrators will have thecapability to manage user and manager accounts to maintain platform order.

Our user stories on Jira effectively articulate the project's objectives, outlining the system'sfunctionalities from the end user's perspective. They are tailored to the specific goals of therespective user groups, thereby shaping the overarching objectives of our project.

![image](https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m11b5gusts/assets/135929686/80c25bd6-e7c6-4948-ada3-242e63962ac5)
![image](https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m11b5gusts/assets/135929686/b039af24-4168-4368-bf35-b0e70de174b8)

### System Structure
![image](https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m11b5gusts/assets/135929686/4f23d3f3-ca5d-4e9b-a72b-76e5478c0978)

The system employs a web application architecture featuring HTML and CSS for front-end presentation, React for dynamic user interfaces, and Flask as the back-end framework for server-side logic. Data storage is managed using SQLite3. Reactcomponents communicate with the Flask server via API calls, enabling data retrieval and manipulation. This architecture ensures aresponsive user experience, with React handling client-side interactivity, while Flask manages server-side operations andcommunicates with the SQLite3 database for data storage and retrieval, resulting in a versatile and efficient web application.

### Challenge Implementation

We use yolov8 to train our customer datasets. We select Disney Card category item image datasets(Harry cards, Dumbledore cards, Lucius cards, and Luna cards) 4 classes to test our image category prediction function. We used 15 of each class, a total of 60 images we took with our phones, and manually marked the category and bounding box of the photos. We also did dataset preprocessing to increase the generalization ability of the model and make the model have better performance. Here is our operational information such as hyperparameters and data augmentation.

● augment: True
● learning_rate: 0.0001
● momentum: 0.95
● rotate: (0, 360)
● mosaic: 1.0
● mixup: 0.0,
● multi_scale: True
● translate: (0.1, 0.1)
● rect: False

In balancing the model effect and time cost, we found that images with 100 epochs and 1024 dimensions gave better results. Here are the results of the model.

#### Confusion matrix
![image](https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m11b5gusts/assets/135929686/e9571724-a33a-45d1-bd5a-5c598a3724d9)

#### Results
![image](https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m11b5gusts/assets/135929686/e5687c46-05cb-4854-a6fc-3e122993768f)

And check the specific results predicted by the model in the training, basically, all categoriesare predicted correctly, and the prediction results of the bounding box are not hugelydifferent.

#### validate image test results
![image](https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m11b5gusts/assets/135929686/9db617bb-98b8-4819-8ae1-d72867b028a6)

We also check the test datasets which are different from the training & validation datasets.We conclude that the model has higher prediction accuracy for photos with fewerbackground items and photos with obvious separation of cards from the background.Although the forecast and the actual photo IOU may be quite different, only the category ofthe photo needs to be predicted and returned to the system.

#### test image results
![image](https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m11b5gusts/assets/135929686/a804d63c-9708-4532-9d78-ef69f89b0fac)
![image](https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m11b5gusts/assets/135929686/7f01f580-984f-4097-8fa5-773fd7e50a1b)

### User Manual
#### Common User
- Introduction Page
Visit http://localhost:3000 to start.By clicking the button or the link on the page, you can switch between the register page,login page, and forget password page.
![image](https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m11b5gusts/assets/135929686/36f48852-1ec4-4eb6-9b72-f940c0ac34ff)

- Registration/Login
Please provide all the information required to register a new account.We identify different users by their email, so your email must be unique.If you are going to register a manager account or administrator account, an additionalauthorization code is needed.Authorization codes(listed three for each but only needs one):For manager: [zxcvb, asdfg, qwert]For administrator: [poiuy, lkjhg, mnbvc]
![image](https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m11b5gusts/assets/135929686/644d79e4-6656-42d5-8fa3-e11d61398055)

- Profile
![image](https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m11b5gusts/assets/135929686/bd64a463-2f48-4441-89d6-472377a6a7f5)

- Market
![image](https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m11b5gusts/assets/135929686/949adc52-b16d-4a8d-960e-ee7249468499)
![image](https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m11b5gusts/assets/135929686/85696f12-3354-4d69-bfa8-9fe027a94a7e)
![image](https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m11b5gusts/assets/135929686/6eb6215d-f5ec-46a1-9fdb-177482667fe4)
![image](https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m11b5gusts/assets/135929686/436d4acd-f837-4514-ad17-a1fe530f7bd5)
![image](https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m11b5gusts/assets/135929686/ca524043-36b6-4f9f-8cb2-7cd6ff8f4f7b)
![image](https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m11b5gusts/assets/135929686/a6dc79d8-5195-4304-9528-c3f4d60ec144)
![image](https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m11b5gusts/assets/135929686/2f600410-da47-434d-b345-e1f74b42dae1)

- My Collectibles
![image](https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m11b5gusts/assets/135929686/eb4086c7-a925-425e-bfd7-396b7ab98b9d)
![image](https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m11b5gusts/assets/135929686/11065bad-8871-4a36-a215-e7d92a2bb829)
![image](https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m11b5gusts/assets/135929686/785d102b-70b1-40fc-8be5-db1d8cfd29e6)
![image](https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m11b5gusts/assets/135929686/eb0bab59-2d9e-4fe3-8a2c-095e24e4aff3)

- Administrator
![image](https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-9900m11b5gusts/assets/135929686/388704c7-67bf-485d-bdee-ac37bddaaf2c)



### Technical Stack

● Frontend: React

● Backend: Flask + sqllite3

● DevOps: Cloud Server + Docker + Nginx


 We use the Windows operating system, using git to clone the project on your own computer.

![img](https://lh7-us.googleusercontent.com/s3xKtaNU-zDeKGqsW8fd3ea4r_SSrScgSrh_xaM7eo4PXu8np046l56JgDkyQdfVIFnanrRCgc8QGymo3WUbZhwc-2RkWS5lMvOWEcb0D7yajYyEW0H5i_6BZ9OrU5BpOSImypMZ_L-2t9OoR3OO5K8)

### Installation and Manual
#### Backend Setup

- cd to the backend directory

![img](https://lh7-us.googleusercontent.com/1MLD-k04_42-dqmCZ-NZtkTJPto9Tp87UEqsZd-gMwE23hMk2q05FCD4Bbcso-OaYq0bziOPZW8h0J5n5VafeO7NMbYyEWjNHXtcxto8bqluqk-C4ueWbcHN1UoRHh8X2FUvkeO6a4W4eDPXlR259Y4)

- Create a virtual environment at the backend directory

![img](https://lh7-us.googleusercontent.com/iTAWAmBE09I-72bolkaMkvr39SdulCBWS9TbBAksVFoNwov9WIUcRL6jwRrriv10Vcq3BTknvZTwahoxCZnR-Zo8f6I5-vGc7x6UGBMgW3G9jDtkaacuyh0Xc34USxR2wrvp8vT-RU3mcHWMQYKyvc8)

- Activate the virtual environment(If you meet the problem, please follow the instruction at the end.)

![img](https://lh7-us.googleusercontent.com/_6c9wQt3e2qCvbS1yfNCanyRreI9P8EYocvspcS9iFWOCJcFcY2Qjj96PN52heOXUJm9MqB_atF6kljr0MZhT4fZhQ0DlckIXp9od7uuY2FVtrQJAgeL_YMfK0sm6pj6kB2pSB6r-_5ZFPVhqKSm_y8)

- Install the requirements.txt package and dependence(May takes about 4 minutes)

![img](https://lh7-us.googleusercontent.com/D2_suoUXmlpv_hQldZu1BLVKmI3pqGDugTcCLrEZRWfZz3EAVNqhsu1NAiHGt9xVFwzWiNlUP6THLY6PRaNqWMSNBoJ5Vte3iYkUeulSCk9dFJ64WBzBYJoNCE4Ammb_uBXp3eDjynFsP463fjqGx0c)

- Once you have installed, you can use python run.py to start the flask backend server.

![img](https://lh7-us.googleusercontent.com/aE60vaJ_pv7u7mzX9QXJwslZ9N-sZgHU91YSMM_VN4lRy4N75eEiI3r9cjV4PCTtdewg_pSNwgHttWQwZQqyxFLFpm_Wu3hzcws-K-9uzvhc-GKTxJX8SIfnH8TcTfukotRThbZWduoLsOJ0KYHEkHw)



### Frontend Setup

- cd to the frontend directory

![img](https://lh7-us.googleusercontent.com/G-SHwqT3rDV6C_9ahRybUKM9JHpo3VeXLoQUyWKWSayK91b96InA2A67opEG4VaeuoHA1oczOz33q8KcY11RAuTow0E29-EYQQh3V0OEMIqQrX9_xK427IVDSXCyVSHSM1whNrx-xWlpFmspF0McJKk)

- Install the frontend package and dependence

![img](https://lh7-us.googleusercontent.com/ceOV62b0kstL8q0mKgXChrb8HDpV-S7hapY_KHVPBqig2pc19hBy8XxxiudLonv64dATcTKo-UMH6faT4iSFI5LhBgclFIgp34NcwWKeweRZWYWym3XCNgm7hDAdBo3D89NdnlYiKTauXMwcN0gJR6Q)

- Start the react

![img](https://lh7-us.googleusercontent.com/swwYiAu83OkMJuTxYQ0rR0pOV0M1hPqlD0T4XoUfPSAzaBKs2z64F-hfkuubLBsJdfGPq8DjxhWTNUMkARAptvpNe51Gdax_VKQ1Bmcg2hbImKlFgi35NlaoG5K_cg6uIOHzaJ2YWPV8bNm3zMxIQ18)



Then you can use 127.0.0.1:3000 to visit frontend server

![img](https://lh7-us.googleusercontent.com/gQTcVvTiDZy2b_hoZZGVHziFnfQuyrJfFODEtT6Ryij_fx0nhE0KXwR_xnI9UcCzR6kPcCl-iv_MKhAQTwFQZXwW30OgHNlelJX3-junwXgCuJbtTTObuGatRMhdblCGg1zdHoCouIXiIPh6gGy6hFs)

##### Exist accounts are provided:

| Login Account             | Login password | username | identity      |
| :------------------------ | :------------- | -------- | ------------- |
| 1378282615@qq.com         | 123456         | Zerek    | User          |
| root@qq.com               | 123456         | root     | User          |
| wendyhahahaha@hotmail.com | 1              | Wendy    | User          |
| liziyu0410@gmail.com      | manager        | manager  | manager       |
| admin@qq.com              | Admin1         | Admin1   | administrator |
| 789@qq.com                | 789            | 789      | User          |

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



##### If you meet the problem when activate the backend environment

![img](https://lh7-us.googleusercontent.com/MB6ThAFUDmzxiYdklxFfiOKRS4ka2ZqUhWO7rRE5Y27deVBhSNog0tbeC2BpScKgfYsol-FqfITuZ0PLqipXg4zwO1QT-HwVJb_iCEK7mZ9cbpV-7jmYHgMAzPgSoaxvizxRpjweGCNTjdDRVYJvD7M)

##### Please follow the steps below

- Run powershell as an administrator

![img](https://lh7-us.googleusercontent.com/dg-6iJod0N4wTzcFcsrFqUnKhtsmvrwHrEcLXwKgHxczURWDtpumArtDA5aR2DnBWQb7KwUaJ51x9PaBggTKlzkzs3IgY3snruhGTc54Yco4Di3a_mzhRUlBODWFkVBh7snoOuGdjPkR0PCIEr7ibA4)

- Execute the command below to change the policy to Bypass:

```linux
Get-ExecutionPolicy

Set-ExecutionPolicy Bypass
```

![img](https://lh7-us.googleusercontent.com/aT0-3ilDVyyME98dz_A5r8yPLP7QrNDa79xjC0tlVxZadN5YwQWY8qPQwhD5Nyk3hUTlk_zPW1HZNXh-hBnhoN6mh5dQdt_vAem0hPKJB4rE5TvOnRn40d8FMLe1kMhY8GNP5E68VnUhDI9pBMME_hk)
