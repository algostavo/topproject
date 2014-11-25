module ApplicationHelper
	def controller_javascript_include_tag
    javascript = "home_controller =>assets/javascripts/home.js "   #e.g. home_controller =>assets/javascripts/home.js  #{params[:controller]}.js
    unless Rails.application.assets.find_asset(javascript).nil?
      javascript_include_tag javascript
    end
  end
end
