d3.csv('./data/coffee-house-chains.csv', d3.autoType).then(data=>{
    console.log('raw data: ', data)
    sorted_data = data.sort((a,b)=>(b.stores-a.stores));
    console.log('sorted data: ', sorted_data)

    const margin = {top: 20, right: 20, bottom: 20, left: 20};
    const width = 650 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

    const xScale = d3.scaleBand()
                     .domain(data.map(d=>d.company))
                     .range([0, width-5]);

    // console.log(d3.extent(data, d=>d.stores))
    // console.log(height)
    const yScale = d3.scaleLinear()
                     .domain([0, d3.max(data, d=>(d.stores))])
                     .range([height, 0]);
    
    const svg = d3.select('.coffee_plot')
                  .append('svg')
                  .attr('width', width + margin.left + margin.right)
                  .attr('height', height + margin.top + margin.bottom)
                  .append('g')
                  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', 65)
        .attr('height', d=>(height-yScale(d.stores)))
        .attr('x', (d,i)=>25+(i*xScale.bandwidth()))
        .attr('y', d=>(yScale(d.stores)))
        // .attr('cx', d=>xScale(d.company))
        // .attr('cy', d=>yScale(d.stores))
        .attr('fill', '#6f4e37');
    
    const xAxis = d3.axisBottom()
                    .scale(xScale);
    const yAxis = d3.axisLeft()
                    .scale(yScale);
    svg.append('g')
       .attr('transform', `translate(20, ${height})`)
       .attr('class', 'axis x-axis')
       .call(xAxis);

    svg.append('g')
       .attr('class', 'axis y-axis')
       .attr("transform", "translate(20, 0)")
       .call(yAxis);
    
    svg.append("text")
       .attr('x', margin.left-20)
       .attr('y', -10)
       .attr('alignment-baseline', 'middle')
       .attr('text-anchor', 'middle')
       .attr('font-size', 14)
       .text("Stores");
})

