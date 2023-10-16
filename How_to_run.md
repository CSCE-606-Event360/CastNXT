rbenv local 2.6.6
rails -s
sudo service mongodb start

db.createUser(
   {
     user: "root",
     pwd: "example",
     roles: [ "readWrite", "dbAdmin" ]
   }
)