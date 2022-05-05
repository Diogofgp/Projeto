export class Milestone {

    public iid: number;
    public project_id: number;
    public title: string;
    public description: string;
    public state: string;

    constructor(iid: number, title: string, description: string, state: string) {
        this.iid = iid;
        this.title = title;
        this.description = description;
        this.state = state;
    }
}