import {Time} from './time';

export interface Timeslot {
    id: number;
    startTime: Time;
    endTime: Time;
    caseNumber: string;
    description: string;
}