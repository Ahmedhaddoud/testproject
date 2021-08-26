import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from 'app/model/Project';
import { ProjectService } from 'app/srevices/project.service';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.scss']
})
export class ListProjectsComponent implements OnInit {
  ProjectForm:FormGroup;
  p:Project;
 id:any;
  projects= [];  
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
      },
      startDate: {
        title: 'Start Date'
      },
      endDate: {
        title: 'End Date'
      },
     
      
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
  constructor(private fb:FormBuilder,private ps:ProjectService,private router:Router) { }

  ngOnInit() {
    this.getProjects();
    this.initialiazeForm();
  }
  getProjects() {
    
    this.ps.getProjects().subscribe(
      data => {
        this.projects = data;
        console.log(data);
      },
      (error) => console.log(error)
    );
  }

  initialiazeForm():void{
    this.ProjectForm=this.fb.group({
      name:'',
      desc:'',
      startDate:'',
      endDate:'',
    })

    }
    onDeleteConfirm(event) {
      console.log("Delete Event In Console")
      console.log(event);
      if (window.confirm('Are you sure you want to delete?')) {
        this.ps.DeleteProject(event.data.id).subscribe(
          res => {
            console.log(res);
            event.confirm.resolve(event.source.data);
            this.getProjects();
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
      this.ProjectForm.controls.name.setValue(event.data.name);
      this.ProjectForm.controls.desc.setValue(event.data.description)
      this.ProjectForm.controls.startDate.setValue(event.data.startDate)
      this.ProjectForm.controls.endDate.setValue(event.data.endDate)
      this.id=event.data.id;
  
      
    }
  
    onSubmit(){
      this.p = new Project();
  
      
     
      this.p.name=this.ProjectForm.controls.name.value;
      this.p.description=this.ProjectForm.controls.desc.value;
      this.p.startDate=this.ProjectForm.controls.startDate.value;
      this.p.endDate=this.ProjectForm.controls.endDate.value;

      console.log(this.p.description);
      this.ps.UpdateProject(this.id,this.p).subscribe(data=>{


        
          console.log(data);
          this.getProjects();
        
       // 
     
      });
     
     
  
  
    }

    onDetail(event) {
      console.log(event.data.id)
    }
    

}
