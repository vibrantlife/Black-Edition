require 'faker'

def seed_user(count)
  count.times {User.create(email: Faker::Internet.email, password: 'cheese')}
end

def display_book_widget(isbn)
  widget = HTTParty.get("https://www.goodreads.com/book/isbn?isbn=#{isbn}&key=#{ENV['KEY']}")
  widget["GoodreadsResponse"]["book"]["reviews_widget"]
end

def display_book_title(isbn)
  book_title = HTTParty.get("https://www.goodreads.com/book/isbn?isbn=#{isbn}&key=#{ENV['KEY']}")
  book_title["GoodreadsResponse"]["book"]["title"]
end

def retrieve_isbn(isbn)
  book_isbn = HTTParty.get("https://www.goodreads.com/book/isbn?isbn=#{isbn}&key=#{ENV['KEY']}")
  book_isbn["GoodreadsResponse"]["book"]["isbn"]
end

def book_covers(isbn)
  picture = "http://covers.librarything.com/devkey/#{ENV['LIBRARY_KEY']}/large/isbn/#{isbn}"
end

def book_description(isbn)
  book_description = HTTParty.get("https://www.goodreads.com/book/isbn?isbn=#{isbn}&key=#{ENV['KEY']}")
  book_description["GoodreadsResponse"]["book"]["description"]
end

def category_assignment(name)
  Category.create(name: name)

end

def seed_books(isbn, category_id)
  Book.create( title: display_book_title(retrieve_isbn(isbn)), isbn: retrieve_isbn(isbn), img_url: book_covers(retrieve_isbn(isbn)), widget: display_book_widget(retrieve_isbn(isbn)), description: book_description(retrieve_isbn(isbn)), category_id: category_id )
end

seed_user(10)

category_assignment("0-5")
category_assignment("Teens")
category_assignment("Popular Black Authors' Books")
category_assignment("Detectives & Gumshoes")


# seed_books(9780152020132, "1") #I like myself
seed_books(9780803710405, "1") #Amazing Grace
seed_books(9780140501827, "1") #snowy day
# seed_books(9780316522755, "1") #I love my hair!
seed_books(9781580891134, "1") #Lola at the Library
# seed_books(9780786809523, "1") #Goldilocks and the 3 bears
# seed_books(9780439921855, "1") #Yo! yes?
seed_books(9780618120383, "1") #Aunt Flossie's Hats
# seed_books(9780439578233, "1") #Charlie Parker Played Be Bop
# seed_books(9780316070164, "1") #Sit-in
seed_books(9781416905851, "1") #Chains
seed_books(9780140348934, "1") #roll of thunder here my cry

#begin teen books
# seed_books(9781416521693, "2") #The Coldest Winter Ever
# seed_books(9780689821813, "2") #Copper Sun
seed_books(9780440228004, "2") #The Watsons Go to Birmingham
# seed_books(9781416906988, "2") #November Blues
seed_books(9781423103851, "2") #The Skin I'm In
seed_books(9780345350688, "2") #The Autobiography of Malcom X
# seed_books(9780758231116, "2") #Culture Clash
seed_books(9780385323062, "2")
seed_books(9780064407311, "2") #monster
seed_books(9780679764083, "2") #langston Hughes selected poems

##begin popular black authors books
seed_books(9780860685111, "3") # I know why the caged bird sings
seed_books(9780671727796, "3") #the color purple
seed_books(9781400033423, "3") #Song of Solomon
seed_books(9780141186351, "3") #giovanni's room
seed_books(9780061120060,  "3") #their eyes were warching god
seed_books(9780452287068, "3") #the bluest eye

## begin popular gumshoe books
seed_books(9780743451796, "4") #devil in a blue dress
seed_books(9780747537779, "4") #shaft
seed_books(9780446692632, "4") #along came a spider


=begin

http://covers.librarything.com/devkey/e4c3afb256a32d47bfe19383b6061b39/medium/isbn/9780439921855

- need to seed the book table with title, widget, isbn number, and img url
-- title can be taken from goodreads make a method to capture this data
-- capture isbn number from goodreads
-- img url can be loaded from book_covers method and include isbn

TODO
# determine how a book can be assigned toa  category
  -- Book.create(category_id: number)
# determine how to get all books that are assigned to a category_id
  -- Book.where(category_id: number)
# determine how to retrieve category name from query
  -- Book.create(title: "first", category_id: 1).category.name
  -- Book.where(category_id: number).category.name


#load all books into activerecord
# upon clicking a button the clicable images appear. when the images are clicked on a user can view reviews.
#fix login and registration with slidetoggle on home page.
#look into flexbox
#add username to model

=end
