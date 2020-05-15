import { Time } from '@angular/common';

export interface User {
    id: number;
    username: string;
    name: string;
    email: string;
    password: string; 
}

export interface CrmUser {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string; 
}

export interface Greeting {
   // id: number;
    message: string;
    post_date: Date;
}

export interface Event {
    // id: number;
     event_name: string;
     event_date: Date;
     event_time: Time;
     ozel: Boolean;
 }

 
export interface Invite {
    // id: number;
     firstname: string;
     lastname: string;
     phone: string;
     email: string;
     modifydate: Date;
     attended: Boolean;
 }