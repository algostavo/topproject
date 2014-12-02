desc "This is to schedule controllers"
	
	task :index do
		objHome = HomeController.new
		objHome.index
	end

	task :execute do
		objTrade = TradeController.new
		objTrade.execute
	end

	task :openTrades do
		objTrade = TradeController.new
		objTrade.openTrades
	end

	task :tradeHistory do
		objTrade = TradeController.new
		objTrade.tradeHistory
	end

