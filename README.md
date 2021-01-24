# mernfeed

This is a simple linked in like feed project built in MERN stack (mongodb, express, react, node)

To install this project on your local machine,
you should have mongodb and node js version 14.4 or greater installed on your machine

1. Download the source code from this git repository in your directory say "feeds"
2. create a database "your-mongodb-database-name" (create .env file in the root folder of this repository, put actual database name in .env file)
3. install packages required for this project

$ cd feeder
$feeder> npm install

$ cd frontend
$feeder/frontend> npm install

Also create .env file in feeder directory, It should be like this

NODE_ENV=development

PORT=5000

MONGO_URL=mongodb://localhost/your-mongodb-database-name

JWT_SECRET=your-secret-key-for-jwt

4. Create sample data to mongodb database by running the script seeder.js
$ cd feeder
$feeder> npm run data:import

5. In future you may want to delete this sample data by running the script seeder.js like below
$ cd feeder
$feeder> npm run data:destroy

6. run the project
$ cd feeder
$feeder> npm run dev

you should see http://localhost:3000 running.
By dafault, if user is not login then it redirects to login page.
See the list of username, passwords in /feeder/backend/data/users.js

Login with say jovita@gmail.com/j123456

you will be redirected to home page, showing a form to create a feed,
and below that feeds are shown

Functionality done so far:

1. user login
2. create a feed
3. show feeds form users which the login user follows
4. show special feeds from medium.com Type A, B
5. Get the feeds on clicking Load More button or scroll down
6. Api - user login
7. Api - get user profile
8. Api - get userIds followed by login user
9. Api - get tags followed by login user
10. Api - login user can follow the userId coming in post request
11. Api - login user can follow the tag coming in post request
12. Api - get the feeds from users which login user follows
13. Api - get the feeds having tags which login user follows
14. Api - get the feeds from users and tags which login user follows
15. Api - get the feeds from medium.com
16. Api - get the feeds having tag which which is passed in GET
17. Api - create a post

Functionality Pending:

1. Get the feeds on scroll down
2. show feeds on tags page
3. Follow/Unfollow user
4. Follow/Unfollow tag
5. global tags - autosuggest while creating feed-post
