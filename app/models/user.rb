require 'bcrypt'

class User < ActiveRecord::Base
  include BCrypt
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true
  validates_format_of :email, with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, on: :create

  #password
  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

  #create an account
  def create
    @user = User.new(params[:user])
    @user.password = params[:password]
    @user.save!
  end

  #authentication
  def login
    @user = User.find_by_email(params[:email])
    if @user.password == params[:password]
      give_token
    else
      redirect_to home_url
    end
  end

  def authenticate(password)
    self.password == password
  end


end
