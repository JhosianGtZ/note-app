import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListNotesComponent } from "./components/list-notes/list-notes.component";
import { CreateNotesComponent } from "./components/create-notes/create-notes.component";

//components
const routes: Routes = [
  {path: '', component: ListNotesComponent},
  {path: 'create-note', component: CreateNotesComponent},
  {path: 'edit-note/:id', component: CreateNotesComponent},
  {path: '***', redirectTo: '', pathMatch: 'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule], 
})
export class AppRoutingModule { }
