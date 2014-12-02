desc "This is to schedule controllers"
	
	task :index do
		objHome = home_controller.new
		objHome.index
	end

	task :execute do
		objTrade = trade_controller.new
		objTrade.execute
	end

	task :openTrades do
		objTrade = trade_controller.new
		objTrade.openTrades
	end

	task :tradeHistory do
		objTrade = trade_controller.new
		objTrade.tradeHistory
	end

