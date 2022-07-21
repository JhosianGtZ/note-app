import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  url = 'http://localhost:4000/api/notes/';

  constructor(private http: HttpClient) { }

  getNotes(sort:string, order:string): Observable<any>{
    return this.http.get(this.url + sort + '/' + order);
  }

  getNotesTitle(): Observable<any>{
    return this.http.get(this.url);
  }

  getNote(id: string): Observable<any>{
    return this.http.get(this.url + id);
  }

  deleteNote(id: string):Observable<any>{
    return this.http.delete(this.url + id);
  }
  
  addNote(note: Note): Observable<any>{
    return this.http.post(this.url, note)
  }
  
  editNote(id: string,note: Note): Observable<any>{
    return this.http.put(this.url + id, note)
  }


}