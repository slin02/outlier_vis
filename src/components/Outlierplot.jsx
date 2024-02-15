import React, { useEffect, useRef} from 'react';
import * as d3 from 'd3';

const Outlierplot = ({ data, algorithm }) => {
    const svgRef = useRef();

    useEffect(() => {
        console.log("Outlierplot called");
        if (data ) {
            const width = 500;
            const height = 400;
            const xPadding = 0.1; 
            const yPadding = 0.1;

            let outlierScores = [];
            if (algorithm === 'Local Outlier Factor') {
                outlierScores = lof(data);
            }

            let colorScale = d3.scaleSequential().range([Math.min(outlierScores), Math.max(outlierScores)]).interpolator(d3.interpolateRgb.gamma(2.2)('red', 'blue'));

            const svg = d3
                .select(svgRef.current)
                .attr('width', width)
                .attr('height', height);

            const xExtent = d3.extent(data, d => d[0]);
            const yExtent = d3.extent(data, d => d[1]);

            const xRange = [0, width];
            const yRange = [height, 0];

            const xScale = d3
                    .scaleLinear()
                    .domain([
                        xExtent[0] - (xExtent[1] - xExtent[0]) * xPadding,
                        xExtent[1] + (xExtent[1] - xExtent[0]) * xPadding
                    ])
                    .range(xRange);

            const yScale = d3
                .scaleLinear()
                .domain([
                    yExtent[0] - (yExtent[1] - yExtent[0]) * yPadding,
                    yExtent[1] + (yExtent[1] - yExtent[0]) * yPadding
                ])
                .range(yRange);

            const tooltip = d3.select('#tooltip');

            svg
                .selectAll('circle')
                .data(data)
                .enter().append('circle')
                .attr('class', 'dot')  
                .attr('cx', d => xScale(d[0]))
                .attr('cy', d => yScale(d[1]))
                .attr('r', 3)
                .attr('fill', (d, i) => colorScale(outlierScores[i]))
                .on('mouseover', function (event, d) {
                    // console.log("here");
                    const i = data.indexOf(d);
                    d3.select(this).attr('r', 6);

                    tooltip.style('visibility', 'visible')
                        .text(`Outlier Score: ${(outlierScores[i].toFixed(2) )}`)
                        .style('left', `${event.pageX}px`)
                        .style('top', `${event.pageY - 28}px`)
                        .style('background-color', 'lightgray');      
                    
                })
                .on('mouseout', function (d, i) {
                    d3.select(this).attr('r', 3);
                    return tooltip.style('visibility', 'hidden');
                });
            
            // Remove the axis elements
            svg.selectAll('.axis').remove();
        }
        
    }, [data, algorithm]);

    return (
        <svg ref={svgRef}></svg>
    );
}

export default Outlierplot;

// LOF algorithm implementation
function lof(data) {
    console.log("LOF called");
    const k = 5; // Number of neighbors
    const distances = [];
    const outlierScores = []; 
    const n = data.length;

    // Calculate distances between each pair of points
    for (let i = 0; i < n; i++) {
        const point = data[i];
        const distance = [];
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                const d = Math.sqrt((point[0] - data[j][0]) ** 2 + (point[1] - data[j][1]) ** 2);
                distance.push([j, d]); // Store the index and distance
            }
        }
        // Sort the distances in ascending order
        distance.sort((a, b) => a[1] - b[1]);
        distances.push(distance);
    }

    // compute local outier factor for each data poont
    for (let i = 0; i < n; i++) {
        const point = data[i];
        let sum = 0;
        for (let j = 0; j < k; j++) {
            const neighborIndex = distances[i][j][0];
            const neighbor = data[neighborIndex];
            let reachabilityDistance = distances[neighborIndex][k - 1][1]; // k-distance of k-th neighbor
            reachabilityDistance = Math.max(reachabilityDistance, distances[i][j][1]); // update reachability distance
            sum += reachabilityDistance; // sum of reachability distances
        }
        // k-distance of k-th neighbor, using small constant in denom to avoid division by 0
        const lof = sum / (k * (distances[i][k - 1][1] + Number.EPSILON)); 
        outlierScores.push(lof);
    }
    
    //print out smallest and largest outlier scores
    console.log("Smallest outlier score: ", Math.min(...outlierScores));
    console.log("Largest outlier score: ", Math.max(...outlierScores));
    return outlierScores;
}