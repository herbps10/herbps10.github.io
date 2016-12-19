require 'yaml'
require 'googlebooks'

books = YAML.load_file("_data/books.yaml")

books.each do |book|
  next if not book["image"].nil?

  search = GoogleBooks.search("isbn:#{book['isbn']}").first
  if search.nil?
    puts "Could not find book cover for #{book['title']}"
  else
    book['image'] = search.image_link
  end
end

File.open('_data/books.yaml', 'w') do |f|
  f.write books.to_yaml
end
