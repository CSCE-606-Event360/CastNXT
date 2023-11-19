
# CASTNXT
Web-App to Automate Talent Audition, Placement, Replacement and Tabulate Pay

# How to run?
1. Visit our Heroku Url: https://castnxtfall-4acce6c18be3.herokuapp.com/
2. Create new users, of either client, talent or admin type.
3. To validate your account, an email will be sent. Refer to that and validate your account.
4. Login and continue!

# How to run tests?

This repo has both Javascript and Ruby on Rails test-cases. Please run them in the following way respectfully. 
# Notice
The root directory of the code is ./web/CASTNXT. All commands should be executed in that directory instead of the current directory.
# ReactJS
1. We rely on JEST for UTs in ReactJS. 
2. After navigating to the code folder, you can either run the command `npm run coverage` or `npm run test`, this shall show you test coverage.

# Ruby:
1. We use rspec for ruby tests.

# Iteration Reports: 
<!-- There are 2 iteration reports and 1 final report in total. -->
https://github.com/CSCE-606-Event360/documentation/tree/main/Fall2023

<!-- # Presentation:
https://tamucs-my.sharepoint.com/:p:/g/personal/anushkagarg_tamu_edu/Efy2j5Wx94RGg3DHXSwwhzABcBfsTAJGz2VbhXSGtP7-5Q?e=glfvnl

# Demo:
https://drive.google.com/file/d/1ltjPFTOFTjmW5PaYCQwqj9crIkx1Y_8r/view -->



<!-- # Iteration Reports: 
There is 1 iteration report present at
https://github.com/tamu-edu-students/CastNXT_Spring2023/tree/main/documentation/Spring2023 -->

# Heroku Deployment:
CastNXT:[https://castnxtfall-4acce6c18be3.herokuapp.com/](https://castnxtfall-4acce6c18be3.herokuapp.com/)

## Steps for Local:
Prerequisites: mongodb:[https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/) \
create a mongodb admin user
```
>use admin;
>db.createUser(
  {
    user: "root",
    pwd: "example",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)
// The username and password should match the definition in `config/mongoid.yml` 
```
\
Clone -> Go to web/CASTNXT
```
/bin/bash --login
rvm install “ruby-2.6.6”
bundle install
```
```
npm install -g npm@8.5.4
nvm install 16.13.0
npm install -g yarn
```
```
bundle exec rails webpacker:install
```
```
rails db:migrate RAILS_ENV=development
rails s -p $PORT -b $IP
```
---
## Steps for Heroku:
prerequisites: docker
> Heroku Build takes a lot of space right now.
Upgrade volume to >=15GB.

Clone -> Go to web/CASTNXT

### Create heroku project
```
heroku login -i
heroku container:login
heroku create -a castnxtfall
```

### Build repo into container and deploy to heroku
```
heroku container:login
heroku container:push web -a castnxtfall
heroku container:release web -a castnxtfall
```
### Set env variables for mongodb
``` 
MONGODB_URI = please contact ksshen2023@tamu.edu to get this immediately.

RAILS_ENV = development
```
The mongodb is for this semester. You have to create your own mongodb database for later development.

### Tail the logs:
```
heroku logs --tail -a castnxtfall
```

## Running tests:
React
```
yarn run test
```
rails
```
bundle exec rspec
```
## Common Errors:
Problem:
RVM is not a function, selecting rubies with 'rvm use ...' will not work.

Solution:
/bin/bash --login

---
Problem:
Webpacker::Manifest::MissingEntryError

Solution:
bundle exec rake assets

---
Problem:
Your Ruby version is X, but your Gemfile specified Y

Solution:
rvm use Y

---
Problem:
Warning! PATH is not properly set up, /home/user/.rvm/gems/ruby-3.1.2/bin is not at first place.

rvm implode
reinstall rvm using https://github.com/rvm/ubuntu_rvm

## Pitfalls

The design of the project is kind of weird. So webpacker is used to marshall the frontend code written in 
web/CASTNXT/app/javascript (check javascript/packs) from app/views using tags like 
<%= javascript_pack_tag 'application', 'data-turbolinks-track': 'reload' %>

for example. 


There are no REST apis, the data is directly injected into the page as javascript for some reason.
Also all the packages are very old and tend to cause a lot of errors if you try to update them so avoid doing
that because it is a rabbit hole of errors where after fixing one two take its place.

Be careful with babel. If the frontend breaks, rebuild it with

```
rails webpacker:install
```

another nifty command is
```
rails webpacker:compile
```

but sometimes it won't work because your change isn't detected so just add a space to the FE code I guess...
