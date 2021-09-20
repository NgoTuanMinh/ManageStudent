export interface Student {
    id?: string;
    name?: string;
    age?: number;
    mark: number;
    city: string;

    [key: string]: any;

    createAt?: string;
    updateAt?: string;
}
