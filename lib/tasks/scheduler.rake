desc "This is to schedule controllers"
	
	task (:index => :environment ) do
		home_controller.new.index
	end

	task (:execute => :environment) do
		trade_controller.new.execute
	end

	task (:openTrades => :environment) do
		trade_controller.new.openTrades
	end

	task (:tradeHistory => :environment) do
		trade_controller.new.tradeHistory
	end

