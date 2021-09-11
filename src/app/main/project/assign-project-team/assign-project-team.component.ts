import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from 'app/model/Project';
import { EquipeService } from 'app/srevices/equipe.service';
import { ProjectService } from 'app/srevices/project.service';

@Component({
  selector: 'app-assign-project-team',
  templateUrl: './assign-project-team.component.html',
  styleUrls: ['./assign-project-team.component.scss']
})
export class AssignProjectTeamComponent implements OnInit {

 
  p:Project;
  projectsWteam=[]
  projects=[];
  users=[];
  ide:number;
  name:'';
 
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
          name: 'detail',
          title: '<i>exposure</i>'
        },
       {
          name: 'edit',
          title: '<i>edit</i>'
        },
      /*  (custom)="onEdit($event)"
         (editConfirm)="onEditConfirm($event)"> 
        */
      
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
  settings1 = {
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
      },
      startDate: {
        title: 'Start Date'
      },
      endDate: {
        title: 'End Date'
      }

      
    },
    actions: {
      add: false,
      edit: false,
      delete: true,
      custom: [
        {
          name: 'assign',
          title: '<i>add_circle</i>'
        },
       /* {
          name: 'detail',
          title: '<i>exposure</i>'
        }*/
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


  constructor(private ts:EquipeService,private router:Router,private fb:FormBuilder,private ps:ProjectService) { }

  ngOnInit() :void{
    
    this.getTeams();    
  
   this.getProjectsWithoutTeam();
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
  getProjectsWithoutTeam() {
    this.ps.getProjectsWithoutTeam().subscribe(
      data => {
        this.projectsWteam = data;
        console.log(data);
      },
      (error) => console.log(error)
    );
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


 

 

  onAssign(event) {
   // console.log(event.data.id)
   this.p=new Project();
   this.p=event.data;
   this.ts.AssignProjectEquipe(this.ide,this.p).subscribe(data=>{

    console.log(data);
    this.getProjectsWithoutTeam();
   // console.log("success",this.c.firstName);
   });
  
   console.log("success");
  }
 
  onDetailEquipe(event) {
    console.log(event.data.id)

    this.ide=event.data.id;
    this.name=event.data.name;
  }
  onCustom(event) {
    switch ( event.action) {
      case 'edit':
      //  this.onEdit(event);
        break;
      case 'detail':
        this.onDetailEquipe(event);
    }
  }

}
