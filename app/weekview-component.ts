import {Component} from 'angular2/core';
import {Day} from './models/day';
import {DayViewComponent} from './dayview-component';
import {ProjectListComponent} from './projectlist-component';
import {OnInit} from 'angular2/core';
import {TimeService} from './services/time-service'

@Component( {
    selector: 'weekview-component',
    template: 
    `
        <div class="project-list-container">
            <projectlist-component></projectlist-component>
        </div>
        
        <div class="week-container">
            <div *ngFor="#day of days" class="day-container">
                <dayview-component [day]="day" ></dayview-component>
            </div>
        </div>
    `,
    directives: [DayViewComponent, ProjectListComponent],
    providers: [TimeService]
})
export class WeekViewComponent implements OnInit  {
    public days: Day[];

    ngOnInit() {
        this._timeService.getAllDays().then(result => this.days = result);
    }
    
    
    constructor(private _timeService: TimeService) {
        
    }
}