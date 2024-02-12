import { Ecosolution } from "./lead-response.interface";

export interface Cleantech {
  id: string;
  name: string;
  logo?: string; // Optional: logo URL
}

export interface Sme {
  id: string;
  name: string;
}


export interface Lead {
  id: string;
  cleantech: Cleantech;
  sme: Sme;
  ecosolution: Ecosolution;
  date: Date; // Assuming "date" should be parsed as a Date object
  message: string;
}
