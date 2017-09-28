# Rails Chat

The goal of our last day is to build a connected chat application with Rails 5.1 and the [webpacker](https://github.com/rails/webpacker) gem. This app will be protected by a Devise sign in, so no more anonymous user chatting!

## Setup

Make sure you have the latest `rails` installed, on a Ruby 2.4+ environment:

```bash
rbenv versions # Do you have 2.4+?
gem install rails
rails -v # Do you have 5.1+?
```

Then you can generate a new rails app with the [Le Wagon Devise template](https://github.com/lewagon/rails-templates#devise):

```bash
cd ~/code/<github_nickname>
rails new \
  -T --database postgresql \
  -m https://raw.githubusercontent.com/lewagon/rails-templates/master/devise.rb \
  chat-rails-redux
cd chat-rails-redux
```

Make sure you can start the rails app:

```bash
rails s
```

And navigate to [localhost:3000](http://localhost:3000). Ready?

## Back-end

Let's start with Rails. The goal is to implement the database to store messages and channels. We also need to provide an API for the front-end, as Redux action creators will need to retrieve some information from Rails.

### Models

Let's start with our database schema. Here is the bare minimum that we need for the application.

![](https://raw.githubusercontent.com/lewagon/react-redux-images/master/rails/chat-rails-redux-schema.png)

The `users` table is already there thanks to the Rails template. Your job is to create the other models and run the migrations.

### Seed
