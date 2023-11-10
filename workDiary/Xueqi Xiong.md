### WEEK 1

- A temporary task is assigned to every individual for the functions mentioned above.

  > Frontend-developer: Jundu, ZiyuLi, WendiGao
  >
  > Backend-developer: XueqiXiong, ZihaoJiang
  >
  > 

### Week 2

1. Designed the software architecture of the application
2. Draw the workflow of development and deployment
3. Designed the application architecture 


### Week 3

1. Test the existing API interface and discuss the backend project structure with another developer
2. Implement the backend API interface of password reset by email
3. Assign different front-end development tasks to different developers


### Week 4
1. API(/Admin/infor/{page}): Administrator can get all the user status(image,name,identity,lock,user_email)
2. API(/Admin/deleteUser): Administrator can delete the user(user_email)
3. API(/Admin/modifyPermission): Administrator can modify the permission of the user
(user_email,identity,lock)
4. API(/Admin/activityInfor/{page}): Administrator can get all the activities information
(name,category,overview,detail,image,status)

### Week 5
1. API(/Activity/createActivity): manager can create the activity(name,status,category,overview,detail,image)
2. API(/Activity/searchActivity/{page}): user can search the activity(activity_name,category,status)
3. API(/Activity/deleteActivity): user can delete the activity by
(activity_name,category)
4. API(/Activity/editActivity): user can edit the activity(name,status,category,overview,detail,image)


### Week 6
1. API(/Admin/approveActivity): Administrator can approve the new activity.
(name,category,status)
2. Cooperate with the front end and coordinate the activity management interface of the manager


### Week 7
1. Cooperate with the front end and coordinate the admin user interface 
2. Cooperate with the front end to coordinate the monitoring activity interface

##### 

### Week 8

1. API(/Topic/commentTopic): All users can comment under all the topics.
2. API(/Topic/createTopic): User can create topics under centain campaign.
3. API(/Topic/deleteTopic): User can delete the topic they create.
4. API(/Topic/editTopic): User can edit the topic they create.



### Week 9

1. API(/Topic/deleteComment/{comment_id}): Only certain people can delete the comments.
2. API(/Topic/getTop10Activities): User can get top 10 activities in which have the most people publish the topic.
3. API(/Topic/getTop10CommentsActivities): User can get top 10 activities in which have the most people comment.
4. API(/Topic/getTop10CommentsTopics): User can get top 10 topics in which have the most people comment.
5. API(/Topic/topicDetail/{activity_id}/{page}/{pagesize}): User can get the detail of the topic.
6. Prepare for the final demo presentation.
