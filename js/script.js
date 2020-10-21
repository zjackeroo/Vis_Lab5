d3.csv('./data/coffee-house-chains.csv', d3.autoType).then(data=>{
    console.log('raw data: ', data)
    sorted_data = data.sort((a,b)=>(b.stores-a.stores));
    console.log('sorted data: ', sorted_data)

    const margin = {top: 20, right: 20, bottom: 20, left: 20};
    const width = 700 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

    const xScale = d3.scaleBand()
                     .domain(sorted_data.map(d=>d.company))
                     .rangeRound([0, width]);

    // console.log(d3.extent(sorted_data, d=>d.stores))
    const yScale = d3.scaleLinear()
                     .domain(d3.extent(sorted_data, d=>d.stores))
                     .range([height, 0]);
    
    const svg = d3.select('.coffee_plot')
                  .append('svg')
                  .attr('width', width + margin.left + margin.right)
                  .attr('height', height + margin.top + margin.bottom)
                  .append('g')
                  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // svg.selectAll('rect')
    //     .data(sorted_data)
    //     .enter()
    //     .append('rect')
    //     .attr('width', 50)
    //     .attr('height', d=>d.stores)
    //     .attr('x', (d,i)=>17+(i*82))
    //     .attr('y', height-data.stores)
    //     .attr('fill', 'orange')
    //     .attr('cx', d=>xScale(d.company))
    //     .attr('cy', d=>yScale(d.stores))
    
    const xAxis = d3.axisBottom()
                    .scale(xScale);
    const yAxis = d3.axisLeft()
                    .scale(yScale);
    svg.append('g')
       .attr('class', 'axis x-axis')
       .call(xAxis)
       .attr('transform', `translate(0, ${height})`);

    svg.append('g')
       .attr('class', 'axis y-axis')
       .call(yAxis);
    
    yLabel = svg.append("text")
                .attr('x', margin.left)
                .attr('y', -10)
                .attr('alignment-baseline', 'middle')
                .attr('text-anchor', 'middle')
                .attr('font-size', 13)
                .text("Stores");
})

