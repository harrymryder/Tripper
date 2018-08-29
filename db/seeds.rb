puts 'Cleaning database...'
PointOfInterest.destroy_all

# scrape("India")
# scrape("Vietnam")
# scrape("Thailand")

def scrape(location)
array = []
  require 'open-uri'
  require 'nokogiri'
  # poi_scrape = {}

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

    results = Geocoder.search("#{name}")
    lat = results.first.coordinates[0]
    lng = results.first.coordinates[1]

    # use code to test in terminal
    # poi_scrape = {}

    # poi_scrape[:name] =  name
    # poi_scrape[:description] = description
    # poi_scrape[:image] = image
    # # poi_scrape[:lat] = lat
    # # poi_scrape[:lng] = lng

    # array << poi_scrape

    PointOfInterest.create!({
      name: name
      description: description
      lat: lat
      lng: lng
      image: image
    })
  end
  # return array
end
# p scrape("Thailand")
