desc "This is to schedule controllers"
	
	task :index do
		home_controller.new.index
	end

	task :execute do
		trade_controller.new.execute
	end

	task :openTrades do
		trade_controller.new.openTrades
	end

	task :tradeHistory do
		trade_controller.new.tradeHistory
	end

