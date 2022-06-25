import { Component, OnInit } from '@angular/core';
import { WsCounterService } from 'src/app/services/ws-counter.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  constructor(public wsCounterService: WsCounterService) { }

  ngOnInit(): void {
  }

  get getCounter() {
    return this.wsCounterService.getCounter;
  }
}
