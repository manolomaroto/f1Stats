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

  private margin: number = 40;
  private width: number = 1000 - this.margin;
  private height: number = 600 - this.margin;
  private xScale: any = d3.scaleBand().range([0, this.width]).padding(0.4);
  private yScale: any = d3.scaleLinear().range([this.height, 0]);

  private teamColors = [
    {team: 'Mercedes', color: '#00D2BE'},
    {team: 'Ferrari', color: '#DC0000'},
    {team: 'Red Bull', color: '#0600EF'},
    {team: 'Alpine F1 Team', color: '#0090FF'},
    {team: 'Haas F1 Team', color: '#FFFFFF'},
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
                .attr("viewBox", `0,0,${this.width-300}, ${this.height+100}`)
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

      let xDomain = this.chartData.map(d => d[0]);
      
      let yDomain = [0, +pointsMax];
      this.xScale.domain(xDomain);
      this.yScale.domain(yDomain)
      this.chart
          .append('g')
          .attr('transform', `translate(0, ${this.height})`)
          .call(d3.axisBottom(this.xScale))
          .selectAll('text')
            .attr('transform', 'translate(-10, 0)rotate(-75)')
            .style('color','white')
            .style('font-size', '18px')
            .style('text-anchor', 'end')

      this.chart
          .append('g')
          .call(d3.axisLeft(this.yScale))
          .selectAll('text')
            .style('font-size', '18px')
            .style('color','white');
  }

  createBars(item) {
    let origin;
    item == 'drivers' ? origin = 2 : origin = 0;
    const barGroups = this.chart.selectAll().data(this.chartData)
        .enter()
        .append('g');
    barGroups.append('rect')
        .attr('x', d => this.xScale(d[0]))
        .attr('y', d => this.yScale(d[1]))
        .attr('width', this.xScale.bandwidth())
        .attr('height', d => this.height - this.yScale(d[1]));
    // Add some efects and color
    barGroups.on('mouseenter', function (actual, i) {
          d3.select(this).attr('opacity', 0.7)
        })
        .on('mouseleave', function (actual, i) {
          d3.select(this).attr('opacity', 1)
        })
        .style('fill', (d,i) => this.getColor(d[origin]));
    // Add text with points in the bars
    barGroups.append('text')
        .text( d => d[1])
        .attr('x', d => this.xScale(d[0]) + this.xScale.bandwidth()/2)
        .attr('y', d => this.yScale(d[1]) -5 )
        .attr("font-size" , "20px")
        .attr('fill', 'white')
        .attr("text-anchor", "middle");
  }

  getColor(item): string{
    for(let i = 0; i < this.teamColors.length; i++) {
      if(item == this.teamColors[i].team){
        return this.teamColors[i].color;
      }
    }
  }

}
