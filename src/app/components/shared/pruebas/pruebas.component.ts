import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3'

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.css']
})
export class PruebasComponent implements OnInit {

  constructor() { }
  dataset = [  5, 10, 15, 20, 25];
  bidimensional = [
    [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
    [410, 12], [475, 44], [25, 67], [85, 21], [220, 88],[600, 150]
  ];
  width: number = 500;
  height: number = 300;
  barPadding = 1;

  ngOnInit(): void {
    /* d3.select("#pruebas").selectAll("div")
    .data(this.dataset)
    .enter()
    .append("div")
    .attr("class", "barra")
    .style('display','inline-block')
    .style('width', '20px')
    .style('background-color', 'teal')
    .style('margin-left', '5px')
    .style('height', d => d * 5 + 'px') */
    const padding = 20;
    let xScale = d3.scaleLinear()
                  .domain([0, d3.max(this.bidimensional, d => d[0])])
                  .range([padding, this.width - padding * 2]);
    let yScale = d3.scaleLinear()
                  .domain([0, d3.max(this.bidimensional, d => d[1])])
                  .range([this.height - padding, padding]);
    let rScale = d3.scaleLinear()
                  .domain([0, d3.max(this.bidimensional, d => d[1])])
                  .range([2,5]);
    const svg = d3.select('#pruebas').append('svg')
                  .attr('width', this.width)
                  .attr('height', this.height);
    
    let xAxis = d3.axisBottom(xScale)
                  .ticks(5);
    let yAxis = d3.axisLeft(yScale)
                  .ticks(5)
    
    svg.selectAll('circle')
        .data(this.bidimensional)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d[0]))
        .attr('cy', d => yScale(d[1]))
        .attr('r', d => rScale(d[1]))
        .attr('fill', 'red');
    
    svg.selectAll('text')
      .data(this.bidimensional)
      .enter()
      .append('text')
      .text(d => d[0]+d[1])
      .attr('x', d => xScale(d[0]))
      .attr('y', d => yScale(d[1]))
      .attr('font-family', 'sans-serif')
      .attr('font-size', '11px')
      .attr('fill', 'white');
    
    svg.append('g')
      .call(xAxis)
      .attr('transform', `translate(0,${this.height-padding})`)
      .attr('class', 'axis')
      .attr('color', 'yellowgreen')
    
    svg.append('g')
      .call(yAxis)
      .attr('transform', `translate(${padding},0)`)
      .call(yAxis)
      .attr('color','green')

    /* const circles = svg.selectAll('circle')
                      .data(this.dataset)
                      .enter()
                      .append('circle')
    circles.attr('cx', (d, i) => {
              return (i * 50) + 25;
            })
            .attr('cy', this.height / 2)
            .attr('r', d => d)
            .attr('fill','red')
            .attr('stroke', 'yellow')
            .attr('stroke-width', d => d/2) */
    
    /* svg.selectAll('rect')
            .data(this.dataset)
            .enter()
            .append('rect')
            .attr('x', (d,i) => { return  i * (this.width / this.dataset.length - this.barPadding)})
            .attr('y', d => this.height - d*4)
            .attr('width', this.width / this.dataset.length - 10)
            .attr('height', d => d*4)
            .attr('fill', d => `rgb(${d* 10},0,0)`)
            .text(d => d)
            .on('mouseover', function(actual, i ) {d3.select(this).style('fill','green')});
    
    svg.selectAll('txt')
            .data(this.dataset)
            .enter()
            .append('text')
            .text(d => d)
            .attr('fill','white')
            .attr("x", (d, i) => {
              return i * (this.width / this.dataset.length) + (this.width / this.dataset.length - this.barPadding) / 2;
            })
            .attr("y", (d) => {
                return this.height - (d * 4) + 15;
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("text-anchor", "middle");*/
  } 

}
