export class Note{
    
    _id?: number;
    title?: string;
    text?: string;
    tag?: string;
    order?: number;
    date?: Date;

    constructor(title: string, text: string, tag:string, date: Date, order: number){
        
            this.title = title;
            this.text = text;
            this.tag = tag;
            this.date = date;
            this.order = order;
    }
}