export class Project {

    public id: number;
    public name: string;
    public description: string;
    public open_issues_count: number;
    public name_with_namespace: string;

    constructor(id: number, name: string, description: string, open_issues_count: number, name_with_namespace: string) {
        this.name = name;
        this.description = description;
        this.id = id;
        this.open_issues_count = open_issues_count;
        this.name_with_namespace = name_with_namespace;
    }
}