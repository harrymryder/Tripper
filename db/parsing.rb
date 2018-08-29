def import
  require 'open-uri'
  require 'nokogiri'

  url = "https://www.visitbritain.com/gb/en/destinations"

  html_file = open(url)
  html_doc = Nokogiri::HTML(html_file)

  nav = html_doc.css('.destinations-nav')
  nav.css('.countries-list li').each do |list|
    country = list.css('a').inner_html
  end

  nav.css('#landing_#{country}').each do |country|
    if country.css('.no-children')
      city = country.css('.no-children a').inner_html
      html_file_city = open("https://www.visitbritain.com/gb/en/#{country}/#{city}")
      html_doc_description = Nokogiri::HTML(html_file_description)
    else
      region = country.css('.region-header a').inner_html
      city = country.css('sub-menu-item a').inner_html
      html_file_city = open("https://www.visitbritain.com/gb/en/#{country}/#{region}/#{city}")
      html_doc_description = Nokogiri::HTML(html_file_description)
    end
  end
    p city

    # html_doc_city = Nokogiri::HTML(html_file_city)

end

p import
