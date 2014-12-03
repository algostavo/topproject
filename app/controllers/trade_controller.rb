class TradeController < ApplicationController

require 'net/http'
require 'json'
require 'rufus-scheduler'
#require 'time' 
#require 'datetime'  # review for daylight savings time



	def granularity
	end


	def execute

		domain = 'https://api-fxpractice.oanda.com'
		accountId = '900859'
		instrument = 'EUR_USD'    
		access_token = '92eb2d8911829720802dda141031945b-942982d88fae70ac1316cc77d1014b4e'


		priceTodayH  = @rateTodayH
		priceUpToday = @rateTodayC if @rateTodayC > @rateTodayO
		priceDnToday = @rateTodayC if @rateTodayC < @rateTodayO
		periodHigh   = @rateHigh
		periodLow    = @rateLow
		range   = periodHigh - periodLow
		leveL1  = 0.10.to_f * range + periodLow
		leveL3  = 0.33.to_f * range + periodLow
		leveL5  = 0.50.to_f * range + periodLow
		leveL6  = 0.66.to_f * range + periodLow
		leveL8  = 0.80.to_f * range + periodLow
		leveL88 = 0.88.to_f * range + periodLow



		if priceUpToday and priceTodayH.between?(leveL3, leveL5)
			paid   = leveL1
		   stop   = paid - (paid * 0.005.to_f) 	# adjust later based on current day volitility?
		   profit = paid + (paid * 0.015.to_f)  	# actively adjust based on real-time orderbook flow? 
		   expiry = 5.days.from_now.strftime('%Y-%m-%dT%H:%M:%S.%fZ')
		   uri    = URI.parse(URI.encode(domain + '/v1/accounts/' + accountId + '/orders' ))
		   params = URI.escape('instrument=' + instrument + '&units=1' + '&side=buy' + '&type=limit' + '&expiry=' + expiry + '&price=' + paid + '&stopLoss=' + stop + '&takeProfit=' + profit )
		   Net::HTTP.start(uri.host, uri.port, :use_ssl => uri.scheme == 'https') do |http|
		   	request = Net::HTTP::Post.new(uri)
		   	request.body = params             
		   	request['Authorization'] = 'Bearer ' + access_token                
		   	response = http.request(request)
		   	puts response.body 
		   	sleep(1.days)
		   elsif priceTodayH > leveL6 and priceUpToday.between?(leveL5, leveL8)
		   	paid   = leveL5
		   	stop   = paid - (paid * 0.005.to_f) 	
		   	profit = paid + (paid * 0.015.to_f)  	
		   	expiry = 5.days.from_now.strftime('%Y-%m-%dT%H:%M:%S.%fZ')
		   	uri    = URI.parse(URI.encode(domain + '/v1/accounts/' + accountId + '/orders' ))
		   	params = URI.escape('instrument=' + instrument + '&units=1' + '&side=buy' + '&type=limit' + '&expiry=' + expiry + '&price=' + paid + '&stopLoss=' + stop + '&takeProfit=' + profit )
		   	Net::HTTP.start(uri.host, uri.port, :use_ssl => uri.scheme == 'https') do |http|
		   		request = Net::HTTP::Post.new(uri)
		   		request.body = params             
		   		request['Authorization'] = 'Bearer ' + access_token                
		   		response = http.request(request)
		   		puts response.body 
		   		sleep(1.days)
		   	elsif priceUpToday and priceTodayH > leveL8
		   		paid   = leveL6
		   		stop   = paid - (paid * 0.005.to_f) 	
		   		profit = paid + (paid * 0.015.to_f)  	
		   		expiry = 5.days.from_now.strftime('%Y-%m-%dT%H:%M:%S.%fZ')
		   		uri    = URI.parse(URI.encode(domain + '/v1/accounts/' + accountId + '/orders' ))
		   		params = URI.escape('instrument=' + instrument + '&units=1' + '&side=buy' + '&type=limit' + '&expiry=' + expiry + '&price=' + paid + '&stopLoss=' + stop + '&takeProfit=' + profit )
		   		Net::HTTP.start(uri.host, uri.port, :use_ssl => uri.scheme == 'https') do |http|
		   			request = Net::HTTP::Post.new(uri)
		   			request.body = params             
		   			request['Authorization'] = 'Bearer ' + access_token                
		   			response = http.request(request)
		   			puts response.body 
		   			sleep(1.days)			
		   		elsif priceDnToday.between?(leveL3, leveL5) and priceTodayH < leveL8
		   			paid   = leveL88
		   			stop   = paid + (paid * 0.005.to_f) 	
		   			profit = paid - (paid * 0.015.to_f)  	
		   			expiry = 5.days.from_now.strftime('%Y-%m-%dT%H:%M:%S.%fZ')
		   			uri    = URI.parse(URI.encode(domain + '/v1/accounts/' + accountId + '/orders' ))
		   			params = URI.escape('instrument=' + instrument + '&units=1' + '&side=sell' + '&type=limit' + '&expiry=' + expiry + '&price=' + paid + '&stopLoss=' + stop + '&takeProfit=' + profit )
		   			Net::HTTP.start(uri.host, uri.port, :use_ssl => uri.scheme == 'https') do |http|
		   				request = Net::HTTP::Post.new(uri)
		   				request.body = params             
		   				request['Authorization'] = 'Bearer ' + access_token                
		   				response = http.request(request)
		   				puts response.body 
		   				sleep(1.days)		      
		   		  end
		   	   	end
		   	  end
		   end
	     end 
	   end											
	end


	def openTrades

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
    		end
 		end
	end


	def tradeHistory

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
	    	end
	 	end
	end		

end
