import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {Day} from './models/day';
import {TimeslotComponent} from './timeslot-component';

@Component( {
    selector: 'dayview-component',
    template: 
    `
    <div class="day-header">
        {{ day.date }} 
    </div>
    <div class="day-body">
    
        <div class="hour-grid">
           <div *ngFor="#hour of hours" class="hour-container">
                {{ hour }}
            </div>
        </div>
        <div class="timeslot-container">
            <div verticaldrag class="timeslot">
            </div>
            <timeslot-component [hours]=hours></timeslot-component>
        </div>
            
    </div>
    `,
    inputs: ['day'], 
    directives: [TimeslotComponent]
})
export class DayViewComponent  implements OnInit  {
    public day: Day;
    public hours: number[];
    
    
    ngOnInit() {
        this.hours = [9, 10, 11, 12, 13, 14, 17, 16, 17, 18];
    }
}