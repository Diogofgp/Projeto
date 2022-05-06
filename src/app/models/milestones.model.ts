export class Milestone {

    public iid: number;
    public id: number;
    public project_id: number;
    public title: string;
    public description: string;
    public state: string;

    constructor(iid: number, title: string, description: string, state: string, id: number) {
        this.iid = iid;
        this.id = id;
        this.title = title;
        this.description = description;
        this.state = state;
    }
}