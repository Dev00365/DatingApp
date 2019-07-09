import { Photo } from './photo';

export interface User {
    id: number;
    name: string;
    knownAs: string;
    age: number;
    gender: string;
    created: Date;
    LastActive: Date;
    photoUrl: string;
    city: string;
    country: string;
    interests?: string;
    introduction?: string;
    lookingFor?: string;
    photo?: Photo[];

}

