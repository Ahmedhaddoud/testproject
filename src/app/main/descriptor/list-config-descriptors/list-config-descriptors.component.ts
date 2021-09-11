import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigDescriptorService } from 'app/srevices/config-descriptor.service';
import { ProjectService } from 'app/srevices/project.service';
import { AuthenticationService } from 'app/_services';
import { EquipeService } from 'app/srevices/equipe.service';
import { ConfigDescriptor } from 'app/model/ConfigDescriptor';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { forEach } from 'lodash';
@Component({
  selector: 'app-list-config-descriptors',
  templateUrl: './list-config-descriptors.component.html',
  styleUrls: ['./list-config-descriptors.component.scss']
})
export class ListConfigDescriptorsComponent implements OnInit { 
  ConfigDescriptorForm:FormGroup;
 

 c:any;
 idp:any;
 id:any;
 team:any;
 name:any;
 projects:[];
  configDescriptors= [];  
  rejectedconfigDescriptors= [];  
  listRejected:[any];
  settings = {
   
    columns: {
      name: {
        title: 'name'
      },
      description: {
        title: 'description'
      }, 
      maintainer: {
        title: 'maintainer'
      },
      etat: {
        title: 'state'
      },
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: [
       
        {
          name: 'assign',
          title: '<i>add_circle</i>'
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


  settings1 = {
    
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
      delete: false,
      custom: [
       
        {
          name: 'detail',
          title: '<i>check</i>'
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
  settings2 = {
   
    columns: {
      name: {
        title: 'name'
      },
      description: {
        title: 'description'
      }, 
      maintainer: {
        title: 'maintainer'
      },
      etat: {
        title: 'state'
      },
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: [
       
        {
          name: 'assign',
          title: '<i>add_circle</i>'
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

  constructor(private cs:ConfigDescriptorService,private router:Router,private ts:EquipeService,private as:AuthenticationService,private ps:ProjectService) { }

  ngOnInit() :void{
   this.id=this.as.currentUserValue.id;
    this.getMyConfigDescriptors(this.id);  
    
   this.getMyTeam(this.id);

  
    
   // this.initialiazeForm();

  }
  onDetail(event) {
    console.log(event.data.id)
    this.idp=event.data.id;
    this.name=event.data.name;
  }

  getMyConfigDescriptors(id:number) {
    this.cs.GetConfigDescriptorByUser(id).subscribe(
      data => {
        this.configDescriptors = data;
        console.log(data);
        this.configDescriptors.forEach((nos) => { // foreach statement  
          if (nos.state=="verified-not-validated"){
            this.listRejected.push(nos);
          }
        
       })  
      },
      (error) => console.log(error)
    );
  }
  
  getMyProjects(id:number) {
    this.ps.getProjectsByTeam(id).subscribe(
      data => {
        this.projects= data;
        console.log(data);
      },
      (error) => console.log(error)
    );
  }
  getMyTeam(id:number){
    this.ts.GetEquipeByUser(id).subscribe(
      data=>{
        this.team=data;
        console.log(data);
        this.getMyProjects(this.team.id);

      },
      (error) => console.log(error)
    );
  }
  onAssign(event) {
    // console.log(event.data.id)
    if (this.idp==null){
      alert("please choose a project ");
    }else{
    this.c = new ConfigDescriptor();
    this.c=event.data;
    this.ps.AssignConfigDescriptorProject(this.idp,this.c).subscribe(data=>{
 
     console.log(data);
     this.getMyConfigDescriptors(this.id);  
  
    // console.log("success",this.c.firstName);
    });
   
   
    alert("Affected To Project "+this.name);
   }
  }






  /*
  initialiazeForm():void{
this.CollaboraterForm=this.fb.group({
firstname:'',
lastname:'',
email:'',
role:'',
adress:''



})
  }
  */
 /*
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

*/
/*
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
  */

}
