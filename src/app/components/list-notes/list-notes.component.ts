import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Note } from 'src/app/models/note';
import { NotesService } from 'src/app/services/notes.service';
import * as moment from "moment";
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

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

  searchValue: string = '';

  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  @Output()

  onSearchTextChanged(){
    this.searchTextChanged.emit(this.searchValue);
  }

  getNotes(){
    this._noteService.getNotes().subscribe(data =>{
      
      this.listNotes = data;

    }, error =>{
      console.log(error);
      
    })
  }

  

  deleteNote(id: any){
    

    Swal.fire({
      title: 'Deseas eliminar esta Nota?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#c81c1c',
      cancelButtonColor: '#E6AF2E'
      
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._noteService.deleteNote(id).subscribe(data =>{

      // this.toastr.error('Nota eliminada con exito', 'Nota eliminada!', {timeOut: 900, positionClass: 'toast-bottom-right'});
      this.getNotes();
    }, error =>{
      console.log(error);
      
    })
        Swal.fire('Nota eliminada!', '', 'error')
      } 
    })
  }
}

