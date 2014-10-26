class HomeController < ApplicationController
  #respond_to :json, :js 

  
  require 'net/http'
  require 'json'
  

  
  def index

    domain = 'https://api-fxpractice.oanda.com'
    access_token = '92eb2d8911829720802dda141031945b-942982d88fae70ac1316cc77d1014b4e'
    instrument = 'EUR_USD'
    # count =  default 500 , max 5000
    # candleFormat =  default bidask, or select midpoint
    granularity = 'D'
    dailyAlignment = '0' # hour of day 0 - 23 to align candles
    alignmentTimezone = 'America%2FNew_York'  # is specified by default
    @chartData = []
    @rateData  = [] 


    uri = URI.parse(URI.encode(domain + '/v1/candles?instrument=' + instrument + '&count=10' + '&candleFormat=midpoint' + '&granularity=' + granularity + '&dailyAlignment=' + dailyAlignment))

    Net::HTTP.start(uri.host, uri.port, :use_ssl => uri.scheme == 'https') do |http|
    	request = Net::HTTP::Get.new uri
    	request['Authorization'] = 'Bearer ' + access_token
    	http.request request do |response|
    		result = response.read_body
          data = JSON.parse(result)
            data['candles'].each do |candle|
              @chartData << candle.values
              @rateData  << candle 
          end
    	 end
    end
  end
end

  