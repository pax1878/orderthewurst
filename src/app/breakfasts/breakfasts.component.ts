import { Component, OnInit } from '@angular/core';
import {BreakfastService} from '../breakfast.service';
import {Breakfast} from '../breakfast';

@Component({
  selector: 'app-breakfasts',
  templateUrl: './breakfasts.component.html',
  styleUrls: ['./breakfasts.component.css']
})
export class BreakfastsComponent implements OnInit {
  public breakfasts: Breakfast[];
  constructor(private breakfastService: BreakfastService) { }

  ngOnInit() {
      this.getBreakfasts();
  }

  getBreakfasts(): void {
    this.breakfastService.getBreakfasts().subscribe(
        breakfasts => this.breakfasts = breakfasts
    );
  }
}
