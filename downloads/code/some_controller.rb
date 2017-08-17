def index
  gon.usernames = User.pluck(:name)
  gon.gravatars = User.all.map { |user| user.gravatar }
  # ...other code that belongs in the controller action
end