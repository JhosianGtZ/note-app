export class Note{
    
    _id?: number;
    title?: string;
    text?: string;
    tag?: string;
    date?: Date;

    constructor(title: string, text: string, tag:string, date: Date){
        
            this.title = title;
            this.text = text;
            this.tag = tag;
            this.date = date;
    }
}