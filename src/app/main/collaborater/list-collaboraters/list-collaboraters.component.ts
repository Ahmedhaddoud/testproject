import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from 'app/model/api.response';
import { CollaboraterService } from 'app/srevices/collaborater.service';
import { $ } from 'protractor';
import { Ng2SmartTableModule }from "ng2-smart-table";
import { CompleterService } from "@akveo/ng2-completer"


import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Collaborater } from 'app/model/Collaborater';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { isThisQuarter } from 'date-fns';

@Component({
  selector: 'app-list-collaboraters',
  templateUrl: './list-collaboraters.component.html',
  styleUrls: ['./list-collaboraters.component.scss']
})
export class ListCollaboratersComponent implements OnInit {
  CollaboraterForm:FormGroup;
  lastnameFG:FormGroup;
  FirstName:FormControl;
  LastName:FormControl;

 c:any;
 id:any;
  collaboraters= [];  
  settings = {
    delete: {
      confirmDelete: true,

      deleteButtonContent: '<i>delete</i>',
      saveButtonContent: 'save',
      cancelButtonContent: 'cancel'
    },
    columns: {
      firstName: {
        title: 'First name'
      },
      lastName: {
        title: 'Last name'
      },
      email: {
        title: 'Email'
      },
      role: {
        title: 'Role'
      },
      adress: {
        title: 'Adress'
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: true,
      custom: [
        {
          name: 'edit',
          title: '<i>edit</i>'
        },
        {
          name: 'detail',
          title: '<i>exposure</i>'
        }
      ],
      position: 'right'
    },
    
    pager: {
      display: true,
      perPage: 10
    },
    attr: {
      class: 'table table-bordered'
    },
  };
  constructor(private cs:CollaboraterService,private router:Router,private fb:FormBuilder,route:ActivatedRoute) { }

  ngOnInit() :void{
    this.getCollaborators();  
    this.initialiazeForm();

  }

  getCollaborators() {
    this.cs.getCollaboraters().subscribe(
      data => {
        this.collaboraters = data;
        console.log(data);
      },
      (error) => console.log(error)
    );
  }
  initialiazeForm():void{
this.CollaboraterForm=this.fb.group({
firstname:'',
lastname:'',
email:'',
role:'',
adress:''



})
  }
 
  onDeleteConfirm(event) {
    console.log("Delete Event In Console")
    console.log(event);
    if (window.confirm('Are you sure you want to delete?')) {
      this.cs.DeleteCollaborater(event.data.id).subscribe(
        res => {
          console.log(res);
          event.confirm.resolve(event.source.data);
          this.getCollaborators();
        })
      }
      else {
      event.confirm.reject();
    }
  }


  onEdit(event) {
    //console.log(event.data.id)
   
  // this.c=this.cs.GetCollaboraterById(event.data.id)
  
    //this.FirstName.setValue(this.c.firstName.toString);
    //console.log(event.data.firstName);
    this.CollaboraterForm.controls.firstname.setValue(event.data.firstName)
    this.CollaboraterForm.controls.lastname.setValue(event.data.lastName)
    this.CollaboraterForm.controls.email.setValue(event.data.email)
    this.CollaboraterForm.controls.role.setValue(event.data.role)
    this.CollaboraterForm.controls.adress.setValue(event.data.adress)
    
    this.id=event.data.id;

    
  }

  onSubmit(){
    this.c = new Collaborater();

    
    this.c.firstName=this.CollaboraterForm.controls.firstname.value;
    this.c.lastName=this.CollaboraterForm.controls.lastname.value;
    this.c.email=this.CollaboraterForm.controls.email.value;
    this.c.role=this.CollaboraterForm.controls.role.value;
    this.c.adress=this.CollaboraterForm.controls.adress.value;
    console.log(this.id);
    this.cs.UpdateCollaborater(this.id,this.c).subscribe(
      data=>{console.log(data),error => console.error()
        this.getCollaborators();
      });
    
   



  }
  onDetail(event) {
    console.log(event.data.id)
  }
  
  }
    
   


