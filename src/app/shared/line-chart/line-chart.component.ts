import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { timeParse } from 'd3';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  private chart: any;
  private svg: any;

  dimensions = {
    width: 1000,
    height: 600,
    margin: {
      top: 115,
      right: 20,
      bottom: 40,
      left: 60
    }
  }

  private data = [{date: '2007-04-23', close: 93.24},
    {date: '2007-04-24', close: 50},
    {date: '2007-04-25', close: 32},
    {date: '2007-04-26', close: 100},
    {date: '2007-04-29', close: 20}] // Puntos totales de cada piloto

  constructor() { }

  ngOnInit(): void {
    const yAccessor = (d) => d.close;
    const dateParser: any = d3.timeParse("%Y-%m-%d");
    const xAccessor = (d) => dateParser(d['date']);
    const boundedWidth = this.dimensions.width - this.dimensions.margin.left - this.dimensions.margin.right;
    const boundedHeight = this.dimensions.height - this.dimensions.margin.top - this.dimensions.margin.bottom;

    const yScale = d3
                    .scaleLinear()
                    .domain(d3.extent(this.data, yAccessor))
                    .range([boundedHeight, 0]);

    const xScale = d3
                    .scaleTime()
                    .domain(d3.extent(this.data, xAccessor))
                    .range([0, boundedWidth])
    const referenceBandPlacement = yScale(100);

    this.svg = d3.select("#lineChart")
                .append('svg')
                .attr("viewBox", `0,0,${this.dimensions.width}, ${this.dimensions.height}`)
    this.chart = this.svg.append('g')
                .style('transform', `translate(${this.dimensions.margin.left}px, ${this.dimensions.margin.top}px)`);
  
    const referenceBand = this.chart
                .append('rect')
                .attr('x', 0)
                .attr('width', boundedWidth)
                .attr('y', referenceBandPlacement)
                .attr('height', boundedHeight - referenceBandPlacement)
                .attr('fill', '#ffece6');
    const lineGenerator: any = d3.line()
                            .x(d => xScale(xAccessor(d)))
                            .y(d => yScale(yAccessor(d)))
                            .curve(d3.curveBasis);

    const line = this.chart.append('path')
                  .attr('d', lineGenerator(this.data))
                  .attr('fill', 'none')
                  .attr('stroke', 'red')
                  .attr('stroke-width', 2);

    const yAxisGenerator = d3.axisLeft(yScale);
    const yAxis = this.chart.append('g').call(yAxisGenerator);

    const xAxisGenerator = d3.axisBottom(xScale);
    const xAxis = this.chart.append('g')
                  .call(
                    xAxisGenerator.tickFormat(d3.timeFormat("%d"))
                  .ticks(7))
                  .style('transform', `translateY(${boundedHeight}px)`);

    const chartTitle = this.svg.append('g')
                          .style("transform", `translate(${50}px,${15}px)`)
                          .append("text")
                          .attr("class", "title")
                          .attr("x", this.dimensions.width / 2)
                          .attr("y", this.dimensions.margin.top / 2)
                          .attr("text-anchor", "middle")
                          .text("Example of line chart")
                          .style("font-size", "36px")
                          .style("text-decoration", "underline");
  }
}
