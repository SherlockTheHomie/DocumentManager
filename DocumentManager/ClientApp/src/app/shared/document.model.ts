export class Document {
    public id: number;
    public name: string;
    public path: string;
    public category: string;
    
    constructor(id: number, name: string, path: string, category: string) {
        this.id = id;
        this.name = name;
        this.path = path;
        this.category = category;
    }
}
