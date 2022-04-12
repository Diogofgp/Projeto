
export class Project {
    public id: number;
    public name: string;
    public description: string;
    public issues_number: number;

    constructor(id: number, name: string, description: string, issues_number: number) {
        this.name = name;
        this.description = description;
        this.id = id;
        this.issues_number = issues_number;
    }
}