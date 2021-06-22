export interface IUser {
    name: string;
    surname: string;
    email: string;
    avatar: string;
}

export interface IComputer {
    arch: string;
    name: string;
    os: string;
    ram: number;
    cpu: string;
}

export interface IApplication {
    name: string;
    arch: string;
    vendor: string;
    size: number;
    installDate: Date;    
}

export class IColumn {
    width: number;
    visibility: boolean;
    template: string;
    dictionary: string[]
}