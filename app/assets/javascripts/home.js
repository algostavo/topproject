window.onload = function () {
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
        dataPoints: [   // Y: [Open, High ,Low, Close]
            {x:  new Date(2014,04,01),  y:[60.16,  60.26,  59.13,  59.24]},
            {x:  new Date(2014,04,02),  y:[59.42,  59.42,  58.34,  59.00]},
            {x:  new Date(2014,04,05),  y:[58.83,  59.35,  58.61,  59.26]},
            {x:  new Date(2014,04,06),  y:[59.38,  60.36,  59.11,  59.11]},
            {x:  new Date(2014,04,07),  y:[59.16,  60.23,  58.70,  60.13]},
            {x:  new Date(2014,04,08),  y:[59.94,  61.31,  59.69,  60.10]},
            {x:  new Date(2014,04,09),  y:[60.00,  60.33,  59.27,  59.94]},
            {x:  new Date(2014,04,12),  y:[60.19,  61.25,  59.89,  61.04]}, 
            {x:  new Date(2014,04,13),  y:[61.01,  61.12,  60.24,  60.37]}, 
            {x:  new Date(2014,04,14),  y:[60.09,  60.80,  59.98,  60.19]}, 
            {x:  new Date(2014,04,15),  y:[60.55,  61.00,  59.27,  60.82]}, 
            {x:  new Date(2014,04,16),  y:[61.00,  61.00,  59.80,  60.47]}, 
            {x:  new Date(2014,04,19),  y:[60.34,  61.27,  60.18,  60.98]}, 
            {x:  new Date(2014,04,20),  y:[61.05,  61.30,  60.37,  60.98]}, 
            {x:  new Date(2014,04,21),  y:[60.98,  61.82,  60.98,  61.29]}, 
            {x:  new Date(2014,04,22),  y:[61.26,  61.67,  60.81,  61.42]}, 
            {x:  new Date(2014,04,23),  y:[61.44,  61.57,  60.94,  61.44]}, 
            {x:  new Date(2014,04,27),  y:[61.69,  61.75,  60.85,  61.12]}, 
            {x:  new Date(2014,04,28),  y:[61.18,  61.24,  60.34,  60.86]}, 
            {x:  new Date(2014,04,29),  y:[60.95,  61.90,  60.74,  61.66]}, 
            {x:  new Date(2014,04,30),  y:[61.84,  62.44,  61.55,  61.97]}  
        ]
    }
    ]
});
chart.render();
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
