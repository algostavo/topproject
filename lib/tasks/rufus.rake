namespace :rufus do
desc "This is to schedule controllers"
	
	task(:index => :environment) do
		home_controller.index
	end

	task(:execute => :environment) do
		trade_controller.execute
	end

	task(:openTrades => :environment) do
		trade_controller.openTrades
	end

	task(:tradeHistory => :environment) do
		trade_controller.tradeHistory
	end


end