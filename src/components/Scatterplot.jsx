import React, { useEffect, useRef} from 'react';
import * as d3 from 'd3';

const Scatterplot = ({ data }) => {
    const svgRef = useRef(null);
    // console.log('d3', d3.version);

    useEffect(() => {
        if (data) {

            const width = 500;
            const height = 400;
    
            const svg = d3
                .select(svgRef.current)
                .attr('width', width)
                .attr('height', height);

            const xPadding = 0.05; // Adjust the padding as needed
            const yPadding = 0.05; // Adjust the padding as needed

            const xExtent = d3.extent(data, d => d[0]);
            const yExtent = d3.extent(data, d => d[1]);

            const xRange = [0, width];
            const yRange = [height, 0];

            const xScale = d3
                .scaleLinear()
                .domain([
                    xExtent[0] - (xExtent[1] - xExtent[0]) * 0.01,
                    xExtent[1] + (xExtent[1] - xExtent[0]) * xPadding
                ])
                .range(xRange);

            const yScale = d3
                .scaleLinear()
                .domain([
                    yExtent[0] - (yExtent[1] - yExtent[0]) * 0.01,
                    yExtent[1] + (yExtent[1] - yExtent[0]) * yPadding
                ])
                .range(yRange);
            
            svg
                .selectAll('circle')
                .data(data)
                .enter()
                .append('circle')
                .attr('cx', d => xScale(d[0]))
                .attr('cy', d => yScale(d[1]))
                .attr('r', 1.5)
                .attr('fill', 'black');
    
            // Remove the axis elements
            svg.selectAll('.axis').remove();
        }
    }, [data]);

    
    return <svg ref={svgRef}></svg>;
};

export default Scatterplot;
