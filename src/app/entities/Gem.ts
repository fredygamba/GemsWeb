import { Comment } from '@angular/compiler';

export interface Gem {

    id?: string;
    name: string;
    description: string;
    images: string[];
    price: number;
    publicationDate: Date;
    likes: string[];
    comments: Comment[];
    shared: string[];

}