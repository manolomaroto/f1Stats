import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3'
import { style } from 'd3';
import { F1StatsService } from '../../services/f1-stats.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})

export class BarChartComponent implements OnInit {
  @Input() graphToShow = "drivers";
  public data: any;
  private chart: any;
  private svg: any;
  public chartData: Array<any>= [];

  private barWidth: number = 50;
  private margin: number = 39;
  private width: number = 1000 - this.margin * 2;
  private height: number = 600 - this.margin * 2;
  private xAxisWidth: number;
  private yAxisHeight: number;
  private xScale: any;
  private yScale: any;

  private teamColors = [
    {team: 'Mercedes', color: '#00D2BE'},
    {team: 'Ferrari', color: '#DC0000'},
    {team: 'Red Bull', color: '#0600EF'},
    {team: 'Alpine F1 Team', color: '#0090FF'},
    {team: 'Hass F1 Team', color: '#FFFFFF'},
    {team: 'Aston Martin', color: '#006F62'},
    {team: 'AlphaTauri', color: '#2B4562'},
    {team: 'McLaren', color: '#FF8700'},
    {team: 'Williams', color: '#005AFF'},
    {team: 'Alfa Romeo', color: '#900000'}
  ]

  constructor(private f1StatsService: F1StatsService) { }

  ngOnInit(): void {
    this.svg = d3.select("#divChart")
                .append('svg')
                .attr("viewBox", `0,0,${this.width+100}, ${this.height+100}`)
    this.chart = this.svg.append('g');

    if (this.graphToShow == 'drivers') {
      this.displayBarChartDrivers();
    } else {
      this.displayBarChartConstructors();
    }
  }

  displayBarChartDrivers() {
    this.f1StatsService.getCurrentDrivers().subscribe(res => {
      let pointsMax;
      this.data = res.MRData.StandingsTable.StandingsLists[0].DriverStandings;
      this.chartData = [];
      this.data.forEach( item => {
        this.chartData.push([item.Driver.familyName, item.points, item.Constructors[0].name]);
      });
      pointsMax = this.chartData[0][1];
      this.chart.remove();
      this.chart = this.svg.append('g');
      this.createAxis(this.chartData.length, pointsMax);
      this.createBars('drivers');
      this.chart.attr('transform', `translate(0, ${this.margin}) scale(.6)`);
    });
  }

  displayBarChartConstructors(){
    this.f1StatsService.getCurrentConstructors().subscribe(res => {
      let pointsMax;
      this.data = res.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
      this.chartData = [];
      this.data.forEach( item => {
        this.chartData.push([item.Constructor.name, item.points]);
      });
      pointsMax = this.chartData[0][1];
      this.chart.remove();
      this.chart = this.svg.append('g');
      this.createAxis(this.chartData.length, pointsMax) ;
      this.createBars('constructors');
      this.chart.attr('transform', `translate(0, ${this.margin}) scale(.8)`);
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
          .call(d3.axisBottom(this.xScale))
          .selectAll('text')
            .attr('transform', 'translate(-10, 0)rotate(-45)')
            .style('color','white')
            .style('font-size', '18px')
            .style('text-anchor', 'end')

      this.chart
          .append('g')
          .attr('transform', `translate(${this.margin}, 0)`)
          .call(d3.axisLeft(this.yScale))
          .selectAll('text')
            .style('font-size', '18px')
            .style('color','white');
  }

  createBars(item) {
    let origin;
    item == 'drivers' ? origin = 2 : origin = 0;
    if(item=='constructors'){
      this.barWidth = 50;
    }
    this.chart.selectAll().data(this.chartData)
        .enter()
        .append('rect')
        .attr('x', (d, i) => this.margin * 1.5 + i*(this.margin+this.barWidth))
        .attr('y', d => this.yAxisHeight - d[1])
        .attr('width', this.barWidth)
        .attr('height', d => d[1])
        .style('fill', (d,i) => this.getColor(d[origin]))
  }

  getColor(item): string{
    for(let i = 0; i < this.teamColors.length; i++) {
      if(item == this.teamColors[i].team){
        return this.teamColors[i].color;
      }
    }
  }

}
