sudo service mongodb start
brew services start mongodb-community@7.0

db.createUser(
   {
     user: "root",
     pwd: "example",
     roles: [ "readWrite", "dbAdmin" ]
   }
)

gem install bundler
bundle install

eval "$(rbenv init -)"
rbenv local 2.6.6
rails s

EDITOR="vim" rails credentials:edit