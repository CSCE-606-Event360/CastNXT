## Steps for Local:
Clone -> Go to web/CASTNXT
```
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
```
heroku login -i
heroku container:login
heroku create -a <app_name>
```
```
heroku container:push web -a <app_name>
heroku release web -a <app_name>
```

Tail the logs:
```
heroku logs --tail -a <app_name>
```