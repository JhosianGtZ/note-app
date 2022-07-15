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
    this.getNotes();
  }


  getNotes(){
    this._noteService.getNotes().subscribe(data =>{
      
      this.listNotes = data;

    }, error =>{
      console.log(error);
      
    })
  }



  deleteNote(id: any){
    this._noteService.deleteNote(id).subscribe(data =>{
      this.toastr.error('Nota eliminada con exito', 'Nota eliminada!', {timeOut: 900, positionClass: 'toast-bottom-right'});
      this.getNotes();
    }, error =>{
      console.log(error);
      
    })
  }
}
