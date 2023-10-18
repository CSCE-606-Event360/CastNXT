## Steps for Local:
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

### Tail the logs:
```
heroku logs --tail -a castnxtfall
```

## Running tests:
```
yarn run test
```

THERE ARE NO RUBY TESTS. THEY DO NOT WORK. THEY ARE DEPRECATED. (See todo list #2)

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


## TODOs
search for "TODO" in the project for some weird things spotted

1. integrate SAML single sign on
2. maybe add some tests for the backend??

