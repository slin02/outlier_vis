import React, { useEffect, useRef} from 'react';
import * as d3 from 'd3';

const Scatterplot = ({ data }) => {
    const svgRef = useRef(null);

    useEffect(() => {
        if (data) {
            drawChart();
        }
    }, [data]);

    const drawChart = () => {
        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = 500 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        const svg = d3
            .select(svgRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const xScale = d3
            .scaleLinear()
            .domain([0, d3.max(data, d => d[0])])
            .range([0, width]);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(data, d => d[1])])
            .range([height, 0]);

        svg
            .selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', d => xScale(d[0]))
            .attr('cy', d => yScale(d[1]))
            .attr('r', 5)
            .attr('fill', 'steelblue');

        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);

        svg
            .append('g')
            .attr('transform', `translate(0,${height})`)
            .call(xAxis);

        svg.append('g').call(yAxis);
    };

    return <svg ref={svgRef}></svg>;
};

export default Scatterplot;
