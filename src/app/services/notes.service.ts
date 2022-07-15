import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  url = 'http://localhost:4000/api/notes/';

  constructor(private http: HttpClient) { }

  getNotes(): Observable<any>{
    return this.http.get(this.url);
  }
  
}