import {Timeslot} from './timeslot';

export interface Day {
    id: number;
    date: Date;
    name: string;
    
    timeslots: Timeslot[];
    
    
    
}