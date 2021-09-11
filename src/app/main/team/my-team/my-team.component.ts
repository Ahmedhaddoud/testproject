import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { DialogSuccessComponent } from 'app/main/dialog-success/dialog-success.component';

import { DialogComponent } from 'app/main/dialog/dialog.component';
import { Collaborater } from 'app/model/Collaborater';
import { Equipe } from 'app/model/Equipe';
import { EquipeService } from 'app/srevices/equipe.service';
import { AuthenticationService } from 'app/_services';
import * as shape from 'd3-shape';


@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class MyTeamComponent implements OnInit {
  view: string;
    card9Expanded: boolean;
    card10Expanded: boolean;
    card19: any;
    card24: any;
    card25: any;
    card26: any;
  team:any;
  e:any;
  id:number;
  name:"";
  description:'';
  Collaboraters:[];
  numberCollab:any;
  
  

  constructor( public dialog: MatDialog,private ts:EquipeService,private router:Router,private fb:FormBuilder, private auth:AuthenticationService)  {
   
    // Set the defaults
    this.view = 'preview';

    this.card9Expanded = false;
    this.card10Expanded = false;
    this.card19 = {
        scheme: {
            domain: ['#5c84f1']
        },
        data  : [
            {
                name  : 'GOOG',
                series: [
                    {
                        name : 'Jan 1',
                        value: 540.2
                    },
                    {
                        name : 'Jan 2',
                        value: 539.4
                    },
                    {
                        name : 'Jan 3',
                        value: 538.9
                    },
                    {
                        name : 'Jan 4',
                        value: 539.6
                    },
                    {
                        name : 'Jan 5',
                        value: 540
                    },
                    {
                        name : 'Jan 6',
                        value: 540.2
                    },
                    {
                        name : 'Jan 7',
                        value: 540.48
                    }
                ]
            }
        ],
        curve : shape.curveBasis
    };

    

}

  ngOnInit() {
    this.id=this.auth.currentUserValue.id;

    this.ts.GetEquipeByUser(this.id).subscribe(
      data => {
    
        this.e=data;
        console.log(data);
        this.team=this.e;
        this.name=this.team.name;
        this.description=this.team.description;
        this.ts.GetCollaboraterByTeam(this.team.id).subscribe(
            data => {
                this.Collaboraters=data;
                this.numberCollab=this.Collaboraters.length;
                console.log("aaa",this.numberCollab)
               

            },
            (error) => console.log(error)
            
            );
        
        
      },
      (error) => console.log(error)
    );

  
    }
    listed(){
        for(let c in this.Collaboraters){
            console.log(this.Collaboraters.length)

        }
    }
    ListCollaboraters(){
        this.openDialog(this.Collaboraters,'', 'List of Collaboraters in my Team', DialogSuccessComponent);
    }
   

    openDialog(l:any,msg: string, type: any, dialogC) {
        const dialogRef = this.dialog.open(dialogC, {
          height: '200px',
          width: '500px',
        
          data: {list:l,message: msg, type: type}
        });
      }
    
  
}
  
 



  
  
  



