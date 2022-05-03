export class Issue {

    public iid: number;
    public title: string;
    public state: string;
    public time_stats: [];
    public assignee: [];
    public labels: [];
    public milestone: [];

    /* public time_stats = {
        time_estimate: number,
        total_time_spent: number,
        human_time_estimate: string,
        human_total_time_spent: string,

    }; */

    constructor(iid: number, title: string, state: string, time_stats: [], assignee: [], labels: [], milestone: []) {
        this.iid = iid;
        this.title = title;
        this.state = state;
        this.time_stats = time_stats;
        this.assignee = assignee;
        this.labels = labels;
        this.milestone = milestone;
    }
}