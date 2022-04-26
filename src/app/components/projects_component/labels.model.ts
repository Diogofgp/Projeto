export class Label {

    public id: number;
    public name: string;
    public color: string;
    public description: string;

    constructor(id: number, name: string, color: string, description: string) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.description = description;
    }
}