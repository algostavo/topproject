class RatesController < ApplicationController
=begin
  require 'net/http'
  require 'yajl'
  
  def show
    domain = 'https://stream-fxpractice.oanda.com'
    access_token = '92eb2d8911829720802dda141031945b-942982d88fae70ac1316cc77d1014b4e'
    account_id = '900859'
    instruments = 'EUR_USD,GBP_USD,USD_JPY,AUD_USD'
    showHeartBeats=1
    parser = Yajl::Parser.new(:symbolize_keys => true)
    #parser.on_parse_complete = block
    
    
    uri = URI.parse(URI.encode(domain + '/v1/prices?accountId=' + account_id + '&instruments=' + instruments))

    Net::HTTP.start(uri.host, uri.port, :use_ssl => uri.scheme == 'https') do |http|
        request = Net::HTTP::Get.new uri
        request['Authorization'] = 'Bearer ' + access_token

        http.request request do |response|
            response.read_body do |chunk|
              parser << chunk
              puts chunk
            end
          end         
        end  
      end  
=end  
    end
