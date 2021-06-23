export interface User {
    name: string;
    surname: string;
    email: string;
    avatar: string;
}

export interface Computer {
    arch: string;
    name: string;
    os: string;
    ram: number;
    cpu: string;
}

export interface Application {
    name: string;
    arch: string;
    vendor: string;
    size: number;
    installDate: Date;    
}

export class Column {
    width: number;
    visibility: boolean;
    template: string;
    dictionary: string[]
}