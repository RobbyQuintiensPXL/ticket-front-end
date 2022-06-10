import {Time} from '@angular/common';
import {Location} from '../location/location';

export class Event {

  id?: number;
  eventName: string;
  eventType: string;
  location: Location;
  eventDate: Date;
  eventTime: Time;
  description: string;
  shortDescription?: any;
  price?: number;
  ticketsLeft: number;
  banner: string;
  thumbnail: string;
  accepted: boolean;


  constructor(args?: Event) {
    this.id = args?.id;
    this.eventName = args?.eventName;
    this.eventType = args?.eventType;
    this.location = args?.location;
    this.eventDate = args?.eventDate;
    this.eventTime = args?.eventTime;
    this.description = args?.description;
    this.shortDescription = args?.shortDescription;
    this.price = args?.price;
    this.ticketsLeft = args?.ticketsLeft;
    this.banner = args?.banner;
    this.thumbnail = args?.thumbnail;
    this.accepted = args?.accepted;
  }
}
