import {ElementRef, Output, EventEmitter} from 'angular2/core';

export class Draggable {
    @Output() change: EventEmitter<any> = new EventEmitter();
    
    private container: HTMLElement;
    private element: HTMLElement;
    private dragActive: boolean;
    private containerOffset: number;
    private innerOffset: number;
    private positionY: number = 0;
    
    public relativeY: number;
    
    constructor(el: HTMLElement, dayContainer: HTMLElement) {
        
        this.element = el;
        this.container = dayContainer;
        
        this.containerOffset = this.container.getBoundingClientRect().top;
        
        this.element.addEventListener('mousedown', (e) => this.startDrag(e));
        document.addEventListener('mouseup', (e) => this.stopDrag(e));
        document.addEventListener('mousemove', (e) => this.dragElement(e));
        
    }
   
   
    startDrag(e: MouseEvent) {
        this.dragActive = true;
        this.innerOffset = e.clientY - this.element.getBoundingClientRect().top;
    }
    
    stopDrag(e: MouseEvent) {
       if (this.dragActive) {
            this.dragActive = false;
            
            this.calculateRelativeValues();
            this.change.emit(null);
       }
    }
    
    dragElement(e: MouseEvent) {
        if (this.dragActive == true) {
            
            var yTop = (e.clientY  - this.containerOffset - this.innerOffset);
            
            if (yTop < 0) {
                yTop = 0;
            }
            
            this.positionY = yTop;
            this.element.style.top = this.positionY + 'px';
        }
    }
    
    calculateRelativeValues() {
        
        var parentArea = this.container.getBoundingClientRect();
        
        this.relativeY = (this.positionY / parentArea.height);
        
        
    }
   
}