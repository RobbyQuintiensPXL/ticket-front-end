export class Location {

  id?: number;
  buildingName: string;
  zipCode: number;
  city: string;
  address: string;
  country: string;

  constructor(args?: Location) {
    this.id = args?.id;
    this.buildingName = args?.buildingName;
    this.zipCode = args?.zipCode;
    this.city = args?.city;
    this.address = args?.address;
    this.country = args?.country;
  }
}
