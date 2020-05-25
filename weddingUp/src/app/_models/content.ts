export interface Content {
    id: number;
    name: string;
    venue_name: string;
    schedule_reception?: string;
    schedule_meal?: string;
    directions_car?: string;
    directions_taxi?: string;
    the_date: Date;
    the_host: string;
}
