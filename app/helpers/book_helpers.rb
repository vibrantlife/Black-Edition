helpers do

  def display_book_widget(book_id)
    @goodreads_response = HTTParty.get("https://www.goodreads.com/book/show/#{book_id}?format=xml&key=#{ENV['KEY']}")
    @goodreads_response["GoodreadsResponse"]["book"]["reviews_widget"]
  end

  def elementary_books(book_id)
    @library_response = HTTParty.get("https://www.librarything.com/work/#{book_id}/book/116869849")
    p @library_response.title
    p @library_response.img
  end

  def book_covers(isbn)
    @picture = "http://covers.librarything.com/devkey/e4c3afb256a32d47bfe19383b6061b39/large/isbn/#{isbn}"
  end
end
