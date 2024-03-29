export interface Hotel {
    image: string;
    address: {
        street: string;
        city: string;
        state: string;
        zipcode: string;
    }
    rooms: string[];
    owner: string;
    neighborhood: string;
    description: string;
    price: number;
    amenities: string[];
}