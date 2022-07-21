import { Component, EventEmitter, OnInit, Output , LOCALE_ID} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Note } from 'src/app/models/note';
import { NotesService } from 'src/app/services/notes.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";



@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.css']
})

export class ListNotesComponent implements OnInit {
  listNotes: Note[]= [];
  closeResult= '';

  constructor(private _noteService: NotesService, private toastr: ToastrService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getNotes();
  }

  searchValue: string = '';

  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  @Output()

  onSearchTextChanged(){
    this.searchTextChanged.emit(this.searchValue);
  }


  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  

  getNotes(){
    this._noteService.getNotes('order', '1').subscribe(data =>{
      
      this.listNotes = data;

    }, error =>{
      console.log(error);
      
    })
  }

  getNotesFilter(){
    this._noteService.getNotes('title', '1').subscribe(data =>{
    
      
      // this.listNotes = data;
     const altaPrioridad = this.listNotes.filter( function (e){
          return e.order == 1;
      })

    }, error =>{
      console.log(error);
      
    })
  }



  getNotesTitle(){
    this._noteService.getNotes('title', '1').subscribe(data =>{
    
      
      this.listNotes = data;

    }, error =>{
      console.log(error);
      
    })
  }
  getNotesDate(){
    this._noteService.getNotes('date', '1').subscribe(data =>{
    
      
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


  select(){
    console.log("A de alfa");
    
  }
}

