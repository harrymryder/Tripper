puts 'Cleaning database...'

def scrape(location)
  require 'open-uri'
  require 'nokogiri'

  url = "https://www.audleytravel.com/#{location}/places-to-go"

  html_file = open(url)
  html_doc = Nokogiri::HTML(html_file)

  html_doc.css('.card').each do |card|
    array = []
    image = card.at('.img-wrapper img')['data-src']
    name = card.css('.cardALink').inner_html.sub('amp;','').sub('&', 'and')
    link = card.css('.cardALink').attribute('href')

    html_file_description = open("https://www.audleytravel.com#{link}")
    html_doc_description = Nokogiri::HTML(html_file_description)

    description = html_doc_description.css('.intro').inner_html.sub('amp;','').sub('&', 'and')

    # results = Geocoder.search("#{name}")
    # lat = results.first.coordinates[0]
    # lng = results.first.coordinates[1]

    poi_scrape = {}

    poi_scrape[:name] =  name
    poi_scrape[:description] = description
    poi_scrape[:photo] = image
    # poi_scrape[:lat] = lat
    # poi_scrape[:lng] = lng

    PointOfInterest.create!(poi_scrape)
  end
end

scrape("japan")
scrape("thailand")
scrape("vietnam")
scrape("laos")

puts 'Done'



