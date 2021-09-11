import { DatePipe } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Equipe } from 'app/model/Equipe';
import { Project } from 'app/model/Project';
import { EquipeService } from 'app/srevices/equipe.service';
import { ProjectService } from 'app/srevices/project.service';
import * as _moment from 'moment';
import { Moment } from 'moment';

const moment = _moment;

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {
  ProjectForm:FormGroup;
  p:Project;
  a:any;
  b:any;
  startDerror : any;
  endDaterror : any;
  error:any;
  teams:[];
  selectedObject:Equipe;
  

  constructor(private fb:FormBuilder,private router:Router,private ps:ProjectService,private datePipe: DatePipe,private ts:EquipeService) { }
  startDateChanged(event){
    this.startDerror="";
    console.log("dateee",event.target.value)
    this.a=event.target.value
    this.a= this.datePipe.transform(event.target.value, 'dd/MM/yyyy');
    
  }
  endDateChanged(event){
    console.log("dateee",event.target.value)
    this.b=event.target.value
    this.b= this.datePipe.transform(event.target.value, 'dd/MM/yyyy');
  }
  ngOnInit() {
    this.getTeams();
    this.initialiazeForm();
    console.log(this.selectedObject)
    
  }
  selectChangeHandler (event: any) {
    //update the ui
  //  this.selected = event.target.value;
    //console.log(event.)
    //console.log(this.selectedObject)
  }

  initialiazeForm():void{
    this.ProjectForm=this.fb.group({
    name:'',
    description:'',
    startDate:['',Validators.required],
    endDate:['',Validators.required],
    team:''
   })
  }

  onSubmit(){
    this.p=new Project();

    
    this.p.name=this.ProjectForm.controls.name.value;
    this.p.description=this.ProjectForm.controls.description.value;
    

   this.p.startDate=this.a;
   
   this.p.endDate=this.b;
    if (this.p.startDate>this.p.endDate){
      console.log("error")
      this.startDerror="invalid start date of project";
    }else{

    this.ps.CreateProject(this.p).subscribe(
      data=>{console.log(data),error => console.error()
        this.router.navigate(["listProjects"]);
      }
      );
      }
    

    
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
 


}
