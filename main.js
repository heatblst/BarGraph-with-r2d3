var data = [{'name':"Apple",'value': 45},{'name':"Banana",'value': 28},{'name':"Orange",'value': 57},{'name':"Grapes",'value': 38},{'name':"Mangoes", 'value': 47},{
  'name':"Strawberries",'value': 15}];


var dataWidth = 450, dataHeight = 500, axis = 150;

var svgHeight = dataHeight+axis,
	svgWidth = dataWidth+axis;

var chart = d3.select('#chart')
	.attr('width', svgWidth+100)
	.attr('height', svgHeight);

var xScale = d3.scaleBand()
	.domain(data.map(function(d){
		return d.name;
	}))
	.rangeRound([0,dataWidth])
	.padding(0.1);

var yScale = d3.scaleLinear()
	.domain([0,d3.max(data, function(d){
		return d.value;
	})])
	.rangeRound([dataHeight, 0]);

var bars = chart.append('g')
	.attr('id', "bars-container");

bars.selectAll('.bar')
	.data(data)
	.enter().append("rect")
	.attr('class',"bar")
	.attr('x',function(d){
		return xScale(d.name);
	})
	.attr('y', function(d){
		return yScale(d.value); 
	})
	.attr('width', xScale.bandwidth())
	.attr('height', function(d){return dataHeight-yScale(d.value);});

xAxis = chart.append('g')
	.attr('id', 'x-axis')
	.call(d3.axisBottom(xScale))
	.attr('transform', 'translate('+axis+','+dataHeight+')')
	.selectAll("text")
	.style("text-anchor",'start')
	.attr('transform', 'rotate(45)');

yAxis = chart.append('g')
	.attr('id','y-axis')
	.call(d3.axisLeft(yScale).ticks(10))
	.attr('transform', 'translate('+axis+',0)');

bars.attr('transform', 'translate('+axis+',0)');

