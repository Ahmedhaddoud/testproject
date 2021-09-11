import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Equipe } from 'app/model/Equipe';
import { EquipeService } from 'app/srevices/equipe.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent implements OnInit {
  TeamForm:FormGroup;
  e:Equipe;

  constructor(private fb:FormBuilder,private ts:EquipeService,private router:Router) { }

  ngOnInit() {
    this.initialiazeForm();
  }
  initialiazeForm():void{
    this.TeamForm=this.fb.group({
    name:'',
    description:''
    
   })
  }
  onSubmit(){
    this.e=new Equipe();

    
    this.e.name=this.TeamForm.controls.name.value;
    this.e.description=this.TeamForm.controls.description.value;
    

 

    this.ts.CreateEquipe(this.e).subscribe(
      data=>{console.log(data),error => console.error()
        this.router.navigate(["listTeam"]);
      }
      );
      
    

    
      }
      onCancel():void{
        this.TeamForm.reset();

      }

 


}
