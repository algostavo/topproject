desc "This is to schedule controllers"
	
	task :index => :environment do
		objHome = HomeController.new
		objHome.index
	end

	task :execute => :environment do
		objTrade = TradeController.new
		objTrade.execute
	end

	task :openTrades => :environment do
		objTrade = TradeController.new
		objTrade.openTrades
	end

	task :tradeHistory => :environment do
		objTrade = TradeController.new
		objTrade.tradeHistory
	end

