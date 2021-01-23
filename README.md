# mernfeed

This is a simple linked in like feed project built in MERN stack (mongodb, express, react, node)

To install this project on your local machine,
you should have mongodb and node js version 14.4 or greater installed on your machine

1. Download the source code from this git repository in your directory say "feeds"
2. create a database called "nszfeeder" (edit .env file located in the root folder of this repository to have different database name)
3. install packages required for this project
$ cd feeder
$feeder> npm install
4. Create sample data to mongodb database by running the script seeder.js
$ cd feeder
$feeder> npm run data:import
5. In future you may want to delete this sample data by running the script seeder.js like below
$ cd feeder
$feeder> npm run data:destroy
6. run the project
$ cd feeder
$feeder> npm run dev

you should see http://localhost:3000 running
By dafault, if user is not login then it redirects to login page
see the list of username, passwords in /feeder/backend/data/users.js

Login with jovita@gmail.com/j123456

you will be redirected to home page, showing a form to create a feed,
and below that feeds are shown

Functionality Done so far:
1. user login
2. create a feed
3. show feeds form users which the login user follows
4. Api - user login
5. Api - get user profile
6. Api - get userIds followed by login user
7. Api - get tags followed by login user
8. Api - login user can follow the userId coming in post request
9. Api - login user can follow the tag coming in post request
10. Api - get the posts from users which login user follows
11. Api - get the posts having tags which login user follows
12. Api - get the posts from medium.com
13. Api - get the posts having tag which which is passed in GET
14. Api - create a post

Functionality Pending: 
1. Get the feeds on clicking Load More button or scroll down
2. Get the feeds mixture of feeds from users and tags which login user follows
3. show feeds on tags page
4. Follow/Unfollow user
5. Follow/Unfollow tag
6. global tags - autosuggest while creating feed-post
