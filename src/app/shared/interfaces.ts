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
    ram: string;
    cpu: string;
}

export interface Application {
    name: string;
    arch: string;
    vendor: string;
    size: number;
    installDate: Date;    
}

export interface Column {
    title?: string;
    width?: number;
    hidden?: boolean;
    template?: string;
    dictionary?: string[]
}

export interface GridFilterItem {
    field: string;
    operator: 'contains';
    value?: string;
}

type GridFilterLogic = 'or' | 'and';

export interface GridFilter {
    filter: {
        logic: GridFilterLogic;
        filters: GridFilterItem[];
    }
}