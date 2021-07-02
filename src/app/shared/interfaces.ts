import { TemplateRef } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

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

export interface Product {
    id: number;
    name: string;
    inStock: number;
    cost: number;
}

export interface GridColumn {
    alias: string;
    title?: string;
    width?: number;
    hidden?: boolean;
    type?: 'text' | 'boolean' | 'list' | 'date';
    filter?: 'text' | 'numeric' | 'boolean' | 'date';
    
    customFilter?: {
        dictionary?: {name: string}[];
        dictionary$?: Observable<{name: string}[]>;
    };

    filterable?: boolean;
    template?: TemplateRef<HTMLElement>;
    customTemplate?: TemplateRef<HTMLElement>;

    validators?: ValidatorFn[];
}

export interface AzureHttpResponse {
    '@odata.context'?: string;
    '@odata.count'?: number;
    value?: any[];
}