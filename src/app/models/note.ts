export class Note{
    
    _id?: number;
    title?: string;
    text?: string;
    tag?: string;
    order?: number;
    date?: Date;
    imagePath?: string; 

    constructor(title: string, text: string, tag:string, date: Date, order: number, imagePath: string){
        
            this.title = title;
            this.text = text;
            this.tag = tag;
            this.date = date;
            this.order = order;
            this.imagePath = imagePath;
    }
}