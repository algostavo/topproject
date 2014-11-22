%w( home_controller ).each do |controller|
  Rails.application.config.assets.precompile += ["#{controller}.js", "#{controller}.css.scss"]
end