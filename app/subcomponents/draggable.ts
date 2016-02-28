import {ElementRef, Output, EventEmitter} from 'angular2/core';

export class Draggable {
    @Output() change: EventEmitter<any> = new EventEmitter();
    
    private container: HTMLElement;
    private element: HTMLElement;
    private content: HTMLElement;
    private topHandle: HTMLElement;
    private bottomHandle: HTMLElement;
    
    private dragActive: boolean;
    private moveType: number;
    private containerOffset: number;
    private innerOffset: number;
    
    private positionTop: number = 0;
    private positionBottom: number = 0;
    
    public relativeTop: number;
    public relativeBottom: number;
    
    constructor(el: HTMLElement, dayContainer: HTMLElement) {
        
        this.element = el;
        this.container = dayContainer;
        
        this.content =  <HTMLElement>this.element.getElementsByClassName('content')[0];
        this.topHandle = <HTMLElement>this.element.getElementsByClassName('handle--top')[0];
        this.bottomHandle = <HTMLElement>this.element.getElementsByClassName('handle--bottom')[0];
        
        this.content.addEventListener('mousedown', (e) => this.initDrag(e));
        this.topHandle.addEventListener('mousedown', (e) => this.initTopResize(e));
        this.bottomHandle.addEventListener('mousedown', (e) => this.initBottomResize(e));
        
        document.addEventListener('mouseup', (e) => this.stopDrag(e));
        document.addEventListener('mousemove', (e) => this.dragElement(e));
        
        this.saveElementPosition();
    }
   
    initDrag(e: MouseEvent) {
        this.moveType = 1;
        this.startDrag(e);
    }
    
    initTopResize(e: MouseEvent) {
        this.moveType = 2;
        this.startDrag(e);
    }
    
    initBottomResize(e: MouseEvent) {
        this.moveType = 3;
        this.startDrag(e);
    }
    
    startDrag(e: MouseEvent) {
        
        this.containerOffset = this.container.getBoundingClientRect().top;
        
        this.dragActive = true;
        this.innerOffset = e.clientY - this.element.getBoundingClientRect().top;
    }
    
    
    stopDrag(e: MouseEvent) {
       if (this.dragActive) {
            this.dragActive = false;
            
            this.saveElementPosition();
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

            if (this.moveType == 1 || this.moveType == 2) {            
                this.element.style.top = yTop + 'px';
            }
            if (this.moveType == 3) {
                this.element.style.height = (e.clientY  - this.containerOffset- this.element.offsetTop ) + 'px';
            }
            
            
            if (this.moveType == 2) {
                this.element.style.height = (this.positionBottom - yTop) + 'px';
            }
            
            
        }
    }
    
    saveElementPosition() {
        var elemArea = this.element.getBoundingClientRect();
        this.positionTop = elemArea.top - this.containerOffset;
        this.positionBottom = elemArea.bottom - this.containerOffset;
    }
    
    calculateRelativeValues() {
        
        var parentArea = this.container.getBoundingClientRect();
        
        this.relativeTop = (this.positionTop / parentArea.height);
        this.relativeBottom = (this.positionBottom / parentArea.height);
        
        
    }
   
}