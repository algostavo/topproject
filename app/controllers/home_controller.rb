class HomeController < ApplicationController

require 'net/http'
require 'json'
require 'rufus-scheduler'

  
  def index
    #scheduler = Rufus::Scheduler.new

    #scheduler.cron '0 */4 * * Mon-Fri' do 

    domain = 'https://api-fxpractice.oanda.com'
    instrument = 'EUR_USD'    
    access_token = '92eb2d8911829720802dda141031945b-942982d88fae70ac1316cc77d1014b4e'
    # t = Time.zone.now
    # first = t.beginning_of_year.strftime('%Y-%m-%dT%H:%M:%S.%fZ')   assign variable for after start = 
    # start =  2014-06-19T15%3A47%3A40Z , if selected no count required
    # count =  default 500 , max 5000
    # candleFormat =  default bidask, or select midpoint
    granularity = 'D'
    dailyAlignment = '0' # hour of day 0 - 23 to align candles
    alignmentTimezone = 'America%2FNew_York'  # is specified by default
    @chartData  = []
    @rateData   = []
    @rateLow    = []
    @rateHigh   = []
    @rateTodayH = []
    @rateTodayO = []
    @rateTodayC = [] 
  

    uri = URI.parse(URI.encode(domain + '/v1/candles?instrument=' + instrument + '&start=2014-01-01' + '&candleFormat=midpoint' + '&granularity=' + granularity + '&dailyAlignment=' + dailyAlignment))

    Net::HTTP.start(uri.host, uri.port, :use_ssl => uri.scheme == 'https') do |http|
    	request = Net::HTTP::Get.new uri
    	request['Authorization'] = 'Bearer ' + access_token
    	http.request request do |response|
    		result = response.read_body
          candleGroup = JSON.parse(result)['candles']

              @rateTodayH = candleGroup.last.select {|k,v| ["highMid"].include?(k)}.collect{|k,v| v}
              @rateTodayO = candleGroup.last.select {|k,v| ["openMid"].include?(k)}.collect{|k,v| v}
              @rateTodayC = candleGroup.last.select {|k,v| ["closeMid"].include?(k)}.collect{|k,v| v}
              @rateLow    = candleGroup.flat_map(&:to_a).select {|k,v| ["lowMid"].include?(k)}.collect{|k,v| v}.min
              @rateHigh   = candleGroup.flat_map(&:to_a).select {|k,v| ["highMid"].include?(k)}.collect{|k,v| v}.max
              @rateData   = candleGroup.flat_map(&:to_a).select{|k,v| ["time", "openMid", "highMid", "lowMid", "closeMid"].include?(k)}.collect{|k,v| v}     

          data = JSON.parse(result)   
            data['candles'].each do |candle|
              @chartData  = [candle] 
          end
        #end      
    	end
    end
  end
end
