class ChartsController < ApplicationController

  require 'net/http'


  def show
  end

end


#curl -X GET "http://api-sandbox.oanda.com/v1/candles?instrument=EUR_USD&count=2&candleFormat=bidask&granularity=D&dailyAlignment=0&alignmentTimezone=America%2FNew_York"
