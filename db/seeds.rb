require 'json'


puts 'Cleaning database...'

def scrape(location)
  require 'open-uri'
  require 'nokogiri'

PointOfInterest.destroy_all

puts 'Generating new database of POI...'

Dir.foreach("#{Rails.root}/app/assets/json/country_poi_data/") do |file|
  next if file == '.' or file == '..'
  puts "working on #{file}"
  read_file = "#{Rails.root}/app/assets/json/country_poi_data/#{file}"
  serialized_poi = File.read(read_file)
  puts "read complete"

  pois = JSON.parse(serialized_poi)
  puts "parse complete"
  pois.each do |poi|
    next if poi.nil?
    PointOfInterest.create!({
      name: poi["Name"],
      lat: poi["Latitude"],
      long: poi["Longitude"],
      description: poi["Description"],
      url: poi["Url"],
      country: poi["Country"],
      })
    end
  end
end


#   html_doc.css('.card').each do |card|
#     array = []
#     image = card.at('.img-wrapper img')['data-src']
#     name = card.css('.cardALink').inner_html.sub('amp;','').sub('&', 'and')
# #     link = card.css('.cardALink').attribute('href')

# scrape("Thailand")
# scrape("India")
# scrape("Vietnam")

def audleytravel_scrape(location)
  require 'open-uri'
  require 'nokogiri'

  url = "https://www.audleytravel.com/#{location}/places-to-go"

  html_file = open(url)
  html_doc = Nokogiri::HTML(html_file)

  html_doc.css('.card').each do |card|
    image = card.at('.img-wrapper img')['data-src']
    name = card.css('.cardALink').inner_html.sub('amp;','').sub('&', 'and')
    link = card.css('.cardALink').attribute('href')

    html_file_description = open("https://www.audleytravel.com#{link}")
    html_doc_description = Nokogiri::HTML(html_file_description)

    description = html_doc_description.css('.intro').inner_html.sub('amp;','').sub('&', 'and')

    # results = Geocoder.search("#{name}")
    # lat = results.first.coordinates[0]
    # lng = results.first.coordinates[1]

    #use code to test in terminal
    poi_scrape = {}

    poi_scrape[:name] =  name
    poi_scrape[:description] = description
    # poi_scrape[:image] = image
    # poi_scrape[:lat] = lat
    # poi_scrape[:lng] = lng



    PointOfInterest.create!(poi_scrape)
  end
end

audleytravel_scrape("japan")
audleytravel_scrape("thailand")
audleytravel_scrape("vietnam")
audleytravel_scrape("laos")

puts 'Done'


  # poi_scrape = {}


    # results = Geocoder.search("#{name}")
    # lat = results.first.coordinates[0]
    # lng = results.first.coordinates[1]

#     poi_scrape = {}

#     poi_scrape[:name] =  name
#     poi_scrape[:description] = description
#     poi_scrape[:photo] = image
#     # poi_scrape[:lat] = lat
#     # poi_scrape[:lng] = lng

#     PointOfInterest.create!(poi_scrape)
#   end
# end

