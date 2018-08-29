require 'json'


puts 'Cleaning database...'
PointOfInterest.destroy_all

puts 'Generating new database of POI...'

Dir.foreach("#{Rails.root}/app/assets/json/country_poi_data/") do |file|
  next if file == '.' or file == '..'
  puts "working on #{file}"
  serialized_poi = File.read(file)
  puts "read complete"

  pois = JSON.parse(serialized_poi)
  puts "parse complete"

  p pois

  # p pois[0].first
  # pois.each do |poi|
  #   print poi
  #   Point_of_interest.new({
  #     name:
  #     lat:
  #     long:
  #     description:
  #     photo:
  #     url:
  #     type:
  #     country:
  #     })
  # end
end

# scrape("Thailand")
# scrape("India")
# scrape("Vietnam")

# def scrape(location)
#   require 'open-uri'
#   require 'nokogiri'
#   # poi_scrape = {}

#   url = "https://www.audleytravel.com/#{location}/places-to-go"

#   html_file = open(url)
#   html_doc = Nokogiri::HTML(html_file)

#   html_doc.css('.card').each do |card|
#     image = card.at('.img-wrapper img')['data-src']
#     name = card.css('.cardALink').inner_html.sub('amp;','').sub('&', 'and')
#     link = card.css('.cardALink').attribute('href')

#     html_file_description = open("https://www.audleytravel.com#{link}")
#     html_doc_description = Nokogiri::HTML(html_file_description)

#     description = html_doc_description.css('.intro').inner_html.sub('amp;','').sub('&', 'and')

#     results = Geocoder.search("#{name}")
#     lat = results.first.coordinates[0]
#     lng = results.first.coordinates[1]

#     #use code to test in terminal
#     # poi_scrape = {}

#     # poi_scrape[:name] =  name
#     # poi_scrape[:description] = description
#     # poi_scrape[:image] = image
#     # poi_scrape[:lat] = lat
#     # poi_scrape[:lng] = lng

#     # array << poi_scrape

#     PointOfInterest.create!({
#       name: name
#       description: description
#       lat: lat
#       lng: lng
#       image: image
#     })
#   end
# end



