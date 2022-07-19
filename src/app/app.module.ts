import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ListNotesComponent } from './components/list-notes/list-notes.component';

import { CreateNotesComponent } from './components/create-notes/create-notes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import  localEs  from "@angular/common/locales/es";

import { registerLocaleData } from "@angular/common";

import { ModalModule } from "ngb-modal";
registerLocaleData(localEs, 'es');



@NgModule({
  declarations: [
    AppComponent,
    ListNotesComponent,
    CreateNotesComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule, 
    ModalModule

  ],
  providers: [{provide: LOCALE_ID, useValue: 'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
