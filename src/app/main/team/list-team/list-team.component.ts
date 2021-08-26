import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Equipe } from 'app/model/Equipe';
import { EquipeService } from 'app/srevices/equipe.service';

@Component({
  selector: 'app-list-team',
  templateUrl: './list-team.component.html',
  styleUrls: ['./list-team.component.scss']
})
export class ListTeamComponent implements OnInit {

  TeamForm:FormGroup;
  id:number;
  e:Equipe;
  projects=[];
  users=[];
 
  teams= [];  
  settings = {
    delete: {
      confirmDelete: true,

      deleteButtonContent: '<i>delete</i>',
      saveButtonContent: 'save',
      cancelButtonContent: 'cancel'
    },
    columns: {
      name: {
        title: 'name'
      },
      description: {
        title: 'description'
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
  constructor(private ts:EquipeService,private router:Router,private fb:FormBuilder) { }

  ngOnInit() :void{
    
    this.getTeams();    
   this.initialiazeForm();
  }

  getTeams() {
    this.ts.getEquipes().subscribe(
      data => {
        this.teams = data;
        console.log(data);
      },
      (error) => console.log(error)
    );
  }

  initialiazeForm():void{
    this.TeamForm=this.fb.group({
    name:'',
    description:'',
   
    
    
    })
  }
 
  onDeleteConfirm(event) {
    console.log("Delete Event In Console")
    console.log(event);
    if (window.confirm('Are you sure you want to delete?')) {
      this.ts.DeleteEquipe(event.data.id).subscribe(
        res => {
          console.log(res);
          event.confirm.resolve(event.source.data);
          this.getTeams();
        })
      }
      else {
      event.confirm.reject();
    }
  }


  onEdit(event) {
    //console.log(event.data.id)
    this.TeamForm.controls.name.setValue(event.data.name);
    this.TeamForm.controls.description.setValue(event.data.description);
    this.id=event.data.id;
    this.projects=event.data.projects;
    this.users=event.data.users;

  }
  onSubmit(){
    this.e=new Equipe();

    
    this.e.name=this.TeamForm.controls.name.value;
    this.e.description=this.TeamForm.controls.description.value;
    this.e.projects=this.projects;
    this.e.users=this.users;
    

    console.log(this.users);
    this.ts.UpdateEquipe(this.id,this.e).subscribe(
      data=>{console.log(data),error => console.error()
        this.getTeams();
      }
      );
     
     
   



  }
  onDetail(event) {
    console.log(event.data.id)
  }
  }
    



