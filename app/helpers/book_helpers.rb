helpers do

  def display_book_widget(book_id)
    @goodreads_response = HTTParty.get("https://www.goodreads.com/book/show/#{book_id}?format=xml&key=#{ENV['KEY']}")
    @goodreads_response["GoodreadsResponse"]["book"]["reviews_widget"]
  end

  def elementary_books(book_id)
    @library_response = HTTParty.get("https://www.librarything.com/work/#{book_id}/book/116869849")
  end

  def book_covers(isbn)
    @picture = "http://covers.librarything.com/devkey/#{ENV['LIBRARY_KEY']}/large/isbn/#{isbn}"
  end
end


#create a method that has all of the books for the elementary school age, junior high, and high school age kids.
# upon clicking a button the clicable images appear. when the images are clicked on a user can view reviews.
#fix login and registration with slidetoggle on home page.
#look into flexbox
#add username to model
