#namespace :rufus do
desc "This is to schedule controllers"
	
	task :index do
		home_controller.index
	end

	task :execute do
		trade_controller.execute
	end

	task :openTrades do
		trade_controller.openTrades
	end

	task :tradeHistory do
		trade_controller.tradeHistory
	end


#end