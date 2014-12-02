
require 'rubygems'
require 'rake'
require 'rufus-scheduler'

scheduler = Rufus::Scheduler.new

	scheduler.cron '0 */4 * * Mon-Fri' do 
		system 'bundle exec rake rufus:index'
	end

	scheduler.cron '1 */4 * * Mon-Fri' do
		system 'bundle exec rake rufus:execute'
	end

	scheduler.cron '2 */4 * * Mon-Fri' do
		system 'bundle exec rake rufus:openTrades'
	end

	scheduler.cron '3 */4 * * Mon-Fri' do
		system 'bundle exec rake rufus:tradeHistory'
	end
