
export class Project {

    public id: number;
    public name: string;
    public description: string;
    public open_issues_count: number;

    constructor(id: number, name: string, description: string, open_issues_count: number) {
        this.name = name;
        this.description = description;
        this.id = id;
        this.open_issues_count = open_issues_count;
    }
}

export interface Iproject {
    id: number;
    name: string;
    description: string;
    issues_number: number;
}

export interface Iproject_details {
    id: number;
    name: string;
    description: string;
}