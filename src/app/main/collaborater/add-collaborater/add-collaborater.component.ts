import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Collaborater } from 'app/model/Collaborater';
import { CollaboraterService } from 'app/srevices/collaborater.service';
import { User } from 'app/_models';
import { UserService } from 'app/_services';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';


@Component({
  selector: 'app-add-collaborater',
  templateUrl: './add-collaborater.component.html',
  styleUrls: ['./add-collaborater.component.scss']
})
export class AddCollaboraterComponent implements OnInit {
  CollaboraterForm: FormGroup;
  c:Collaborater;
 selected:"";
 
 

  constructor(private fb:FormBuilder,private router:Router,private cs:CollaboraterService,private us:UserService) { }

 
  
 



  ngOnInit() {
    this.initialiazeForm();
    
  }
  initialiazeForm():void{
    this.CollaboraterForm=this.fb.group({
    firstName:'',
    lastName:'',
    email:'',
    adress:['',Validators.required],
    password:['',Validators.required],
    role:'',
   })
  }
  onCancel():void{
    this.CollaboraterForm.reset();

  }
  selectChangeHandler (event: any) {
    //update the ui
    this.selected = event.target.value;
  }

  onSubmit(){
    this.c=new Collaborater();
    
    


    
    this.c.firstName=this.CollaboraterForm.controls.firstName.value;
    this.c.lastName=this.CollaboraterForm.controls.lastName.value;
    this.c.email=this.CollaboraterForm.controls.email.value;
    this.c.username=this.CollaboraterForm.controls.email.value;
    this.c.adress=this.CollaboraterForm.controls.adress.value;
    console.log(this.selected);
    this.c.role=this.selected;
    this.c.password=this.CollaboraterForm.controls.password.value;
    
    

 

    this.cs.CreateCollaborater(this.c).subscribe(
      data=>{console.log(data),error => console.error()
        this.router.navigate(["list"]);
      }
      );
      
    

    

      }
      

}
