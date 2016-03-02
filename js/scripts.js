drawChart('chart1',"data_AR_1.csv", "Sucre pour 100g", "Graisses pour 100g");
drawChart('chart2',"data_AR_biscuits.csv", "Sucre pour 100g", "Graisses pour 100g");
drawChart('chart3',"data_AR_jus.csv", "Sucre pour 100mL (g)", "Vitamine C pour 100mL (en mg)");

function drawChart(div, file, xlab, ylab){
    var scatterdata;
   //Don't need to initialize nested array, d3.nest will create it.

d3.csv(file, function (error, csv) {
  if (error) return console.log("there was an error loading the csv: " + error);
  console.log("there are " + csv.length + " elements in my csv set");

  var nestFunction = d3.nest().key(function(d){return d.groups;});
      //create the function that will nest data by country name

  scatterdata = nestFunction.entries(

                      csv.map(function(d){ 
                                     d.x = +d.x;  
                                     d.y = +d.y;  
                                     d.size = +d.size;
                                     d.brands_tags = d.brands_tags
                                     return d;  
                                 })

                    );  //pass the formatted data array into the nest function

  console.log("there are " + scatterdata.length + " elements in my data");
  //this should still match the previous log statement
  //but each element in scatterdatta will be a nested object containing
  //one data point


nv.addGraph(function() {
  var chart = nv.models.scatterChart()
                .showDistX(true)
                .showDistY(true)
                .color([ "#0772A1", "#00B743","#FF8700","#9B1E00", "#FF3100"])
                .pointSize(50).pointRange([100,100])
                .forceX([0,1])
                .forceY([0,1]);

  chart.xAxis
            .tickFormat(d3.format('.01f'))
            .axisLabel(xlab);
            
  chart.yAxis
            .tickFormat(d3.format('.01f'))
            .axisLabel(ylab);
            
  chart.tooltip.contentGenerator(function(key) {
      return '<h3>' + key.point.brands_tags + '</h3>' 
      +'<p>' + key.point.y + '% de graisses' +'</p>'
      +'<p>' + key.point.x + '% de sucre' +'</p>';
  });
  d3.select("#" + div + " svg")
      .datum(scatterdata)
    .transition().duration(500)
      .call(chart);

  nv.utils.windowResize(chart.update);

  return chart;});
  
  });
  
    
}

