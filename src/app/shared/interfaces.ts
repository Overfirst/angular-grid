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

export interface GridColumn {
    alias: string;
    title?: string;
    width?: number;
    hidden?: boolean;
    type?: 'text' | 'boolean' | 'list' | 'date'
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