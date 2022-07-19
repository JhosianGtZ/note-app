import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  title = 'Crear nueva nota.';
  id: string | null;
  searchValue: string = '';
  selected: FormControl = new FormControl();
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
      order: ['', Validators.required],


    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
   }


  ngOnInit(): void {
    this.itsEdit();
  }


  public setVAlue(event:any){
    
    console.log(event.target.value);
    
    if (event.target.value == 'Alta-prioridad') {

       this.noteForm.patchValue({
          order: 1
       })
        
    }else if (event.target.value == 'Media-prioridad') {
      this.noteForm.patchValue({
          order: 2
       })
      
    }else if (event.target.value == 'Baja-prioridad') {
      this.noteForm.patchValue({
        order: 3
     })
      
    }
    
  }


  addNote(){
    const NOTE: Note = {
      
      title: this.noteForm.get('title')?.value,
      text: this.noteForm.get('text')?.value,
      tag: this.noteForm.get('tag')?.value,
      date: this.noteForm.get('date')?.value,
      order: this.noteForm.get('order')?.value
    }

    if (this.id !== null ) {
      //EDIT NOTE
      this._noteService.editNote(this.id, NOTE).subscribe(data =>{
        this.toastr.info('Nota editada con exito!', 'Nota editada', {timeOut: 900, positionClass: 'toast-bottom-right'}) 
        this.router.navigate(['/']);
      }, error =>{
        console.log(error);
        this.noteForm.reset();
        
      })

    }else{
      //ADD NOTE
      console.log(NOTE); 
      this._noteService.addNote(NOTE).subscribe(data =>{
        this.toastr.success('La nota se guardo con exito! ', 'Nota guardada!', {timeOut: 900, positionClass: 'toast-bottom-right'});
        this.router.navigate(['/']);
    
      }, error =>{
        console.log(error);
        this.noteForm.reset();
        
      })
    }


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
          order: data.order,

         })

      })
    }
  }  



}


