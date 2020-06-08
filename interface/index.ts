/* eslint-disable no-unused-vars */
import { ReactNode } from 'react';

export interface Layout {
    children: ReactNode;
}
export interface ChildProps {
    children: ReactNode;
}
export interface ThemeProps {
    theme: boolean;
}

export interface FetchData {
    category?: string;
    color? : string[];
    date?: string;
    description?: string;
    banner?: boolean;
    path?: [string] | null;
    title?: string;
    views?: [] | undefined | number | any;
    __v?: number;
    _id?: string;
    data?: any
}
