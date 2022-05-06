export class TicketOffice {

  id: number;
  email: string;
  organisation: string;
  locations: Location[];

  constructor(args: TicketOffice) {
    this.id = args.id;
    this.email = args.email;
    this.organisation = args.organisation;
    this.locations = args.locations;
  }

}
