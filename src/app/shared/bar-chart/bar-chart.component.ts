import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3'
import { F1StatsService } from '../../services/f1-stats.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})

export class BarChartComponent implements OnInit {
  public data: any;
  private chart: any;
  private svg: any;
  public chartData: Array<any>= [];

  private barWidth: number = 30;
  private margin: number = 25;
  private xAxisWidth: number;
  private yAxisHeight: number;
  private xScale: any;
  private yScale: any;

  private colors: Array<string> = ['red', 'green', 'blue', 'yellow']

  constructor(private f1StatsService: F1StatsService) { }

  ngOnInit(): void {


    this.svg = d3.select("#divChart")
                .append('svg')
                .attr('width', '100%')
                .attr('height', 500)
    this.chart = this.svg.append('g');

    this.displayBarChart();
  }

  displayBarChart() {
    this.f1StatsService.getCurrentDrivers().subscribe(res => {
      let pointsMax;
      this.data = res.MRData.StandingsTable.StandingsLists[0].DriverStandings;
      this.chartData = [];
      this.data.forEach( item => {
        this.chartData.push([item.Driver.familyName, item.points]);
      });
      pointsMax = this.chartData[0][1];
      this.chart.remove();
      this.chart = this.svg.append('g');
      this.createAxis(this.chartData.length, pointsMax);
      this.createBars();
      this.chart.attr('transform', `translate(0, ${this.margin}) scale(.6)`);
    });

    
    
   
  }

  createAxis(items: number, pointsMax) {
      this.xAxisWidth = (this.barWidth + this.margin) * items;
      this.yAxisHeight = pointsMax + this.margin;

      let xDomain = this.chartData.map(d => d[0]);
      this.xScale = d3.scaleBand()
                      .domain(xDomain).range([0, this.xAxisWidth]);
      let yDomain = [0, pointsMax];
      this.yScale = d3.scaleLinear().domain(yDomain)
                      .range([this.yAxisHeight, 0]);

      this.chart
          .append('g')
          .attr('transform', `translate(${this.margin}, ${this.yAxisHeight})`)
          .call(d3.axisBottom(this.xScale));

      this.chart
          .append('g')
          .attr('transform', `translate(${this.margin}, 0)`)
          .call(d3.axisLeft(this.yScale));
  }

  createBars() {
    this.chart.selectAll().data(this.chartData)
        .enter()
        .append('rect')
        .attr('x', (d, i) => this.margin * 1.5 + i*(this.margin+this.barWidth))
        .attr('y', d => this.yAxisHeight - d[1])
        .attr('width', this.barWidth)
        .attr('height', d => d[1])
        .style('fill', (d,i) => this.colors[i%this.colors.length]);
  }

}
