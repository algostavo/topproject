window.onload = function () {

function requestData() {
    $.ajax({
    url: 'index/chartData',
    success: function(data)
    newChart(data)
        // call it again after one day
        //setInterval(requestData, 86400000);
       },
       cache: false
    });
}

var chart = new CanvasJS.Chart("chartContainer",
{
    title:{
        text: "EUR/USD for 2014",
    },
    exportEnabled: true,
    axisY: {
        includeZero:false,
        prefix: "$",
        title: "",
    },     
    axisX: {
        interval:1,
        valueFormatString: "MMM-DD",
    },
    toolTip: {
        content: "Date:{x}</br><strong>Prices:</strong></br>Open:{y[0]}, Close:{y[3]}</br>High:{y[1]},Low:{y[2]}",
    },
    data: [ //data
    {
        type: "candlestick",
        dataPoints: newDataPoints
    }
    ]
});
chart.render();
}

function newChart(data){

    var newDataPoints = [];
    data.forEach(function(point) {
        newDataPoints.push({
            x: new Date(point.substr(0,10)),
            y: [point.open, point.high, point.low, point.close]
        })
    })
}





//var limit = 1000;    //increase number of dataPoints by increasing this
  //  var y = 0;    
  //  var dataPoints = [];    
  //  var formatedDate = date.format("yyyy,mm,dd");
  //  var data = []; var dataSeries = { type: "candlestick" };
  //  obj = JSON && JSON.parse('@chartData') || $.parseJSON('@chartData');
  //  for (var value in obj) {
    //    y = Date.parse.formatedDate;
    //     dataPoints.push({
    //      x: (obj[value]),
    //      y: y                
    //       });
    //    }
  //   dataSeries.dataPoints = dataPoints;
  //   data.push(dataSeries); 



    // var y = 0;
    // var data = []; var dataSeries = { type: "candlestick" };
    // var dataPoints = [];
    // for (var i = 0; i < limit; i += 1) {
    //   y += (Math.random() * 10 - 5);
      //  dataPoints.push({
        // x: i - limit / 2,
          // y: y                
         //  });
      //  }
    // dataSeries.dataPoints = dataPoints;
    // data.push(dataSeries);               
