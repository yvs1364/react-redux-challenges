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

💡 Open your models and add some back-end validations! For instance, a message should not have a blank content!

### Seed

Create a `db/seeds.rb` file which:

1. Destroy messages, users and channels (in that order)
1. Create some channels (`general`, `paris`, `react` for instance)
1. Create some users (needs email / password)
1. Create some messages in several challenges.

Then run it:

```bash
rails db:migrate
```

### Routes

Here are the routes we need to implement:

```ruby
namespace :api, defaults: { format: :json } do
  namespace :v1 do
    resources :channels, only: [] do
      resources :messages, only: [ :index, :create ]
    end
  end
end

resources :channels, only: [ :show ]
root to: 'channels#show'
```

Go ahead and copy/paste them to your `config/routes.rb` file, then run the following command:

```bash
rails routes | grep -v user
```

❓ Do you understand why we need those four routes? Can you explain why? If not, talk to your buddy about it, then ask a TA.

### Controllers

Let's start with the API:

```bash
rails g controller api/v1/messages index create  --skip-template-engine --skip-routes
```

Go ahead and implement the `index` first.

- You need a `before_action` to retrieve the `Channel` model. Retrieve by `name`, not id.
- For the `index` action, render the list of messages [as json](http://guides.rubyonrails.org/layouts_and_rendering.html#rendering-json)

To test those controllers, you can launch the `rails s` and open your browser to [localhost:3000](http://localhost:3000). Log-in then:

Go to [localhost:3000/api/v1/channels/general/messages](http://localhost:3000/api/v1/channels/general/messages). Do you see a JSON? Awesome!


We'll leave the `create` action for later. You can go ahead.

## Front-end

Oops, could not load content.... Reload the page!
