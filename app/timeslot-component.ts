import {Component, ElementRef, EventEmitter} from 'angular2/core';
import {Draggable} from './subcomponents/draggable';

@Component( {
    selector: 'timeslot-component',
    template: 
    `
        <div class="timeslot">
        </div>
    `,
    inputs: ['hours']
})
export class TimeslotComponent  {
    
    private rootDomElement: ElementRef;
    private draggable: Draggable;
    private hours: number[];
    
    public startTime: Date;
    
    constructor(el: ElementRef) {
        this.draggable = new Draggable(el.nativeElement.children[0], el.nativeElement.parentNode);
        this.draggable.change.subscribe((val) => { this.positionUpdated(); });
    }
    
    positionUpdated() {
        var positionInHours = this.draggable.relativeY * this.hours.length;
        var hour = this.hours[Math.floor(positionInHours)];
        var minute = (positionInHours % 1) * 60;
        
        
        document.title = String(hour) + ' : ' + String(minute);
    }
    
}