import { Component, EventEmitter, OnInit, Output , LOCALE_ID, ViewChild} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Note } from 'src/app/models/note';
import { NotesService } from 'src/app/services/notes.service';
import * as moment from "moment";
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { ModalManager } from "ngb-modal";




@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.css']
})
export class ListNotesComponent implements OnInit {
  listNotes: Note[]= [];

  @ViewChild('modalForm') modalForm:any;

  constructor(private _noteService: NotesService, private toastr: ToastrService, private modalService: ModalManager) { }

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

  searchAction(event: any){
    
  

    if (event.target.matches("#search")) {
      document.querySelectorAll(".note").forEach(nota =>{
        nota.textContent?.toLowerCase().includes(event.target.value.toLowerCase())
        ?nota.classList.remove("display")
        :nota.classList.add("display")
      })
    }
    
  }
  

  openModal(){

    this.modalService.open(this.modalForm, {size: 'lg' , backdrop: 'static'})
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



