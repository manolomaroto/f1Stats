import { Component, OnInit } from '@angular/core';
import { F1StatsService } from '../../services/f1-stats.service';

@Component({
  selector: 'app-current-drivers',
  templateUrl: './current-drivers.component.html',
  styleUrls: ['./current-drivers.component.css']
})
export class CurrentDriversComponent implements OnInit {

  constructor(private f1StatsService: F1StatsService) { }

  ngOnInit(): void {
    this.f1StatsService.getCurrentDrivers().subscribe(e => console.log(e));
  }

}
