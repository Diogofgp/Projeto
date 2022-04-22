export class Issue {

    public iid: number;
    public title: string;
    public state: string;
    public time_stats: [];
    public assignee: [];

    constructor(iid: number, title: string, state: string, time_stats: [], assignee: []) {
        this.iid = iid;
        this.title = title;
        this.state = state;
        this.time_stats = time_stats;
        this.assignee = assignee;
    }
}