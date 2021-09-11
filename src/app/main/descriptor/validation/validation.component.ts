import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigDescriptorService } from 'app/srevices/config-descriptor.service';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit {
  configDescriptors= [];  
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
      delete: true,
      custom: [
        {
          name: 'accept',
          title: '<i>check_circle</i>'
        },
        {
          name: 'refuse',
          title: '<i>cancel</i>'
          
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


  constructor(private cs:ConfigDescriptorService,private router:Router) { }

  ngOnInit() {
    this.getConfigDescriptorsNotValidated();
  }
  getConfigDescriptorsNotValidated() {
    this.cs.getConfigDescriptorsNotValidated().subscribe(
      data => {
        this.configDescriptors = data;
        console.log(data);
      },
      (error) => console.log(error)
    );
  }
  onCustom(event) {
    switch ( event.action) {
      case 'accept':
        this.onAccept(event);
        break;
      case 'refuse':
        this.onRefuse(event);
    }
  }

   
  onRefuse(event) {
    this.cs.refuseConfigDescriptor(event.data.id,'').subscribe(data=>{
 
     console.log(data);
     this.getConfigDescriptorsNotValidated();
    // console.log("success",this.c.firstName);
    });
   
    console.log("success");
   }
  
  
  
  onAccept(event) {
   this.cs.acceptConfigDescriptor(event.data.id,'').subscribe(data=>{

    console.log(data);
    this.getConfigDescriptorsNotValidated();
   // console.log("success",this.c.firstName);
   });
  
   console.log("success");
  }



}

  

  

  


