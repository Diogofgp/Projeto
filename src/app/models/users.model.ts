
export class User {

    public id: number;
    public username: string;
    public name: string;
    public description: string;
    public state: string;
    public avatar_url: string;
    public web_url: string;

    constructor(id: number, username: string, name: string, description: string, state: string, avatar_url: string, web_url: string) {
        this.name = name;
        this.description = description;
        this.id = id;
        this.state = state;
        this.username = username;
        this.avatar_url = avatar_url;
        this.web_url = web_url;
    }
}