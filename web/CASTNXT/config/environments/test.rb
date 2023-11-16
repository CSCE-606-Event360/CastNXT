Rails.application.configure do
    config.action_mailer.raise_delivery_errors = true

    config.action_mailer.perform_caching = false
  
  
    config.action_mailer.perform_deliveries = true
  
    # config.action_mailer.delivery_method = :smtp
  
    # config.action_mailer.smtp_settings = {
    #   :address => 'smtp-relay.sendinblue.com',
    #   :port => 587,
    #   :user_name => 'fashionxtllc@gmail.com',
    #   :password => '6QfvMtONKnGwm0SC',
    #   :authentication => 'login',
    #   :enable_starttls_auto => true
    # }
  
    config.action_mailer.delivery_method = :smtp
    config.action_mailer.smtp_settings = {
     address:              'smtp.gmail.com',
     port:                 587,
     domain:               'example.com',
     user_name:            Rails.application.credentials.email_id,
     password:             Rails.application.credentials.email_password,
     authentication:       'plain',
     enable_starttls_auto: true,
     open_timeout:         5,
     read_timeout:         5 }
end