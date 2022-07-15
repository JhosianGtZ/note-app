import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Note } from 'src/app/models/note';

@Component({
  selector: 'app-create-notes',
  templateUrl: './create-notes.component.html',
  styleUrls: ['./create-notes.component.css']
})


export class CreateNotesComponent implements OnInit {

  noteform : FormGroup;

  constructor(
    
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    
    ) {
    this.noteform = fb.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
      tag: ['', Validators.required],
      date: ['', Validators.required],

    });
   }


  ngOnInit(): void {
  }


  addNote(){
    const NOTE: Note = {
      
      title: this.noteform.get('title')?.value,
      text: this.noteform.get('text')?.value,
      tag: this.noteform.get('tag')?.value,
      date: this.noteform.get('date')?.value,
    }
    console.log(NOTE);
    this.toastr.success('Note Saved!', 'Success', {timeOut: 900, positionClass: 'toast-bottom-right'});
    this.router.navigate(['/']);

  };
}
