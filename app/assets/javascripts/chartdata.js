<script src="http://code.highcharts.com/stock/highstock.js"></script>
<script src="http://code.highcharts.com/stock/modules/exporting.js"></script>
<script type="text/javascript" charset="utf-8" >
$(function () {
    $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?a=e&filename=aapl-ohlc.json&callback=?', function (data) {

        // create the chart
        $('#container').highcharts('StockChart', {


            rangeSelector : {
                inputEnabled: $('#container').width() > 480,
                selected : 1
            },

            title : {
                text : 'AAPL Stock Price'
            },

            series : [{
                type : 'candlestick',
                name : 'AAPL Stock Price',
                data : @chartdata,
                dataGrouping : {
                    units : [
                        [
                            'week', // unit name
                            [1] // allowed multiples
                        ], [
                            'month',
                            [1, 2, 3, 4, 6]
                        ]
                    ]
                }
            }]
        });
    });
});