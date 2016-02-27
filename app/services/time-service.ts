
import {Injectable} from 'angular2/core';
import {Day} from '../models/day';
import {DayData} from '../data/mock-week'

@Injectable() 
export class TimeService {
    
    
    
    
    getAllDays() {
        
        return new Promise<Day[]>(resolve => setTimeout(() => resolve(DayData), 1));
    }
    
    setAllDays(rooms: Day[]) {
        //localStorage.setItem('rooms', JSON.stringify(rooms));
    }
}