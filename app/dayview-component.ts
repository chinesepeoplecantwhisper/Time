import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {Day} from './models/day';
import {Timeslot} from './models/timeslot';
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
        <timeslot-component [hours]=hours [timeslot]=slot  *ngFor="#slot of day.timeslots"></timeslot-component>
        </div>
            
    </div>
    `,
    inputs: ['day'], 
    directives: [TimeslotComponent]
})
export class DayViewComponent implements OnInit  {
    public day: Day;
    public hours: number[];
    
    
    ngOnInit() {
        this.day.timeslots
        this.hours = [9, 10, 11, 12, 13, 14, 17, 16, 17, 18];
        
        var slot: Timeslot[] = [
            { id: 1, startTime: { hour: 9, minute: 0 }, endTime: { hour: 10, minute: 0 }, caseNumber: '', description: '' },
            { id: 1, startTime: { hour: 11, minute: 30 }, endTime: { hour: 13, minute: 0 }, caseNumber: '', description: '' }
        ];
        
        this.day.timeslots = slot;
    }
}