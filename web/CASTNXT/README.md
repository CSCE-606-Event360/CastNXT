## Steps for Local:
Clone -> Go to web/CASTNXT
```
/bin/blash --login
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
heroku create -a castnxtspring
```

### Build repo into container and deploy to heroku
```
heroku container:push web -a castnxtspring
heroku container:release web -a castnxtspring
```

### Tail the logs:
```
heroku logs --tail -a castnxtspring
```

## Common Errors:
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
