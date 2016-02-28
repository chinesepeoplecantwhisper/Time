import {Component, ElementRef, EventEmitter, OnInit} from 'angular2/core';
import {Draggable} from './subcomponents/draggable';
import {Time} from './models/time';
import {Timeslot} from './models/timeslot';


@Component( {
    selector: 'timeslot-component',
    template: 
    `
        <div class="timeslot">
            <div class="handle handle--top">
            </div>
            <div class="content">
                <div *ngIf="timeslot">
                    {{timeslot.startTime.hour}}:{{timeslot.startTime.minute}}
                </div>
                <div *ngIf="timeslot.endTime">
                    {{timeslot.endTime.hour}}:{{timeslot.endTime.minute}}
                </div>
            </div>
            <div class="handle handle--bottom">
            </div>
        </div>
    `,
    inputs: ['hours', 'timeslot']
})
export class TimeslotComponent implements OnInit {
        
    private draggable: Draggable;
    private hours: number[];
    
    public timeslot: Timeslot;
    
    constructor(el: ElementRef) {
        this.draggable = new Draggable(el.nativeElement.children[0], el.nativeElement.parentNode);
        this.draggable.change.subscribe((val) => { this.positionUpdated(); });
        
    }
    
    ngOnInit() {
        this.getRelativePositionTime(this.timeslot.endTime);
    }
    
    positionUpdated() {
        
        this.timeslot.startTime = this.getTimeFromRelativePosition(this.draggable.relativeTop);
        this.timeslot.endTime = this.getTimeFromRelativePosition(this.draggable.relativeBottom);
        
    }
    
    getTimeFromRelativePosition(position: number) : Time {
        
        var positionInHours = position * this.hours.length;
        
        var time : Time = {
            hour: this.hours[Math.floor(positionInHours)],    
            minute: Math.floor((positionInHours % 1) * 60)
        };
        
        return time;
    }
    
    getRelativePositionTime(time: Time) : number {
        
        //var positionInHours = this.hours.indexOf(time.hour) / this.hours.length;
        
        //this.draggable.setRelativeTop(positionInHours);
        
        //document.title = String(positionInHours);
        
        return 0;
    }
    
}