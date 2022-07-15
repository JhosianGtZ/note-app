import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Note } from 'src/app/models/note';
import { NotesService } from 'src/app/services/notes.service';
import * as moment from "moment";

@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.css']
})
export class ListNotesComponent implements OnInit {
  listNotes: Note[]= [];

  constructor(private _noteService: NotesService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerNotas();
  }


  obtenerNotas(){
    this._noteService.getNotes().subscribe(data =>{
      console.log(data);
      this.listNotes = data;

    }, error =>{
      console.log(error);
      
    })
  }

}
