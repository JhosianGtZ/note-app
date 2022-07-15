import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Note } from 'src/app/models/note';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-create-notes',
  templateUrl: './create-notes.component.html',
  styleUrls: ['./create-notes.component.css']
})


export class CreateNotesComponent implements OnInit {

  noteForm : FormGroup;
  title = 'Crear Nueva Nota';
  id: string | null;

  constructor(
    
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _noteService: NotesService,
    private aRouter: ActivatedRoute
    
    ) {
    this.noteForm = fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
      tag: ['', Validators.required],
      date: ['', Validators.required],

    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
   }


  ngOnInit(): void {
    this.itsEdit()
  }


  addNote(){
    const NOTE: Note = {
      
      title: this.noteForm.get('title')?.value,
      text: this.noteForm.get('text')?.value,
      tag: this.noteForm.get('tag')?.value,
      date: this.noteForm.get('date')?.value,
    }
    console.log(NOTE); 
    this._noteService.addNote(NOTE).subscribe(data =>{
      this.toastr.success('La nota se guardo con exito! ', 'Nota guardada!', {timeOut: 900, positionClass: 'toast-bottom-right'});
      this.router.navigate(['/']);
  
    }, error =>{
      console.log(error);
      this.noteForm.reset();
      
    })

  };

  itsEdit(){
    console.log('Edit working');
    console.log(this.id);
    
    
    if (this.id !== null) {
      this.title = 'Editar Nota';
      this._noteService.getNote(this.id).subscribe(data =>{
        console.log(data);
        
        this.noteForm.setValue({

          title: data.title,
          text: data.text,
          tag: data.tag,
          date: data.date,

         })

      })
    }
  }  
}
