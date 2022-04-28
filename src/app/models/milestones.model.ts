export class MileStones {

    public id: number;
    public title: string;
    public description: string;
    public state: string;

    constructor(id: number, title: string, description: string, state: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.state = state;
    }
}