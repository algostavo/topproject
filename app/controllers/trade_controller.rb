class TradeController < ApplicationController

require 'net/http'
require 'json'
require 'rufus-scheduler'
#require 'time' 
#require 'datetime'  # review for daylight savings time



	def granularity
	end


	def execute

	end


	def openTrades
		scheduler = Rufus::Scheduler.new

	    scheduler.cron '2 */4 * * Mon-Fri' do

		domain = 'https://api-fxpractice.oanda.com'
	    accountId = '900859'
	    instrument = 'EUR_USD'
	    access_token = '92eb2d8911829720802dda141031945b-942982d88fae70ac1316cc77d1014b4e'    
	    #count = default 50 , max 500 

	    @tradeData	= []
	    @tradeTime  = []
	    @tradePair  = []
	    @tradeSide  = []
	    @tradeUnits = []    
	    @tradePrice = []
	    @tradeTP	= []
	    @tradeSL	= []		

		uri = URI.parse(URI.encode(domain + '/v1/accounts/' + accountId + '/trades?instrument=' + instrument + '&count=5' ))
	    
	    Net::HTTP.start(uri.host, uri.port, :use_ssl => uri.scheme == 'https') do |http|
	    	request = Net::HTTP::Get.new(uri) 
			request['Authorization'] = 'Bearer ' + access_token
			http.request request do |response|
	          result = response.read_body
	          	tradeGroup = JSON.parse(result)['trades']

	          		@tradeData = tradeGroup.flat_map(&:to_a).select{ |k,v| ["time", "instrument", "side", "price", "takeProfit", "stopLoss"].include?(k)}
	          			#render "view", :tradeData => @tradeData
      			end	
    		end
 		end
	end


	def tradeHistory
		scheduler = Rufus::Scheduler.new

	    scheduler.cron '3 */4 * * Mon-Fri' do

		domain = 'https://api-fxpractice.oanda.com'
	    accountId = '900859'
	    instrument = 'EUR_USD'
	    access_token = '92eb2d8911829720802dda141031945b-942982d88fae70ac1316cc77d1014b4e'    
	    #count = default 50 , max 500 

	    @tradeDataHistory	= []
	    @tradeTimeHstory    = []
	    @tradePairHistory   = []
	    @tradeSideHistory   = []
	    @tradeUnitsHistroy  = []    
	    @tradePriceHistory  = []
	    @tradeTPHistory	    = []
	    @tradeSLHistory 	= []
	    @tradePLHistory	    = []	
	    @tradeBalHistory    = []

		uri = URI.parse(URI.encode(domain + '/v1/accounts/' + accountId + '/transactions?instrument=' + instrument + '&count=10' ))
	    
	    Net::HTTP.start(uri.host, uri.port, :use_ssl => uri.scheme == 'https') do |http|
	    	request = Net::HTTP::Get.new(uri) 
			request['Authorization'] = 'Bearer ' + access_token
			http.request request do |response|
	          result = response.read_body
	          	tradeGroupHistory = JSON.parse(result)['transactions']

	          		@tradeDataHistory = tradeGroupHistory.flat_map(&:to_a).select{ |k,v| ["id", "time", "type" "instrument", "side", "price", "takeProfitPrice", "stopLossPrice", "pl", "interest"].include?(k)}
	          			#render "view", :tradeDataHistory => @tradeDataHistory
	      		end	
	    	end
	 	end
	end		

end
