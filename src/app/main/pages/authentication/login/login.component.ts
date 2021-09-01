import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'app/_services';
import { first } from 'rxjs/operators';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseNavigation } from '@fuse/types';
import { navigation2 } from 'app/navigation/navigation2';
import { Output, EventEmitter } from '@angular/core';
import { navigation } from 'app/navigation/navigation';
import { navigation3 } from 'app/navigation/navigation3';
import { navigation4 } from 'app/navigation/navigation4';

@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class LoginComponent implements OnInit
{
   
    loginForm: FormGroup;
  
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    form:any={};
    navigation : any;

  
    

    /**
     * Constructor
     *
     //
     */
    // @param {FuseConfigService} _fuseConfigService
     //@param {FormBuilder} _formBuilder
     constructor(private formBuilder: FormBuilder,
        private _fuseConfigService: FuseConfigService,

        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private _fuseNavigationService: FuseNavigationService,
        ) {
if (this.authenticationService.currentUserValue) {
   
    
    this.router.navigate(['/']);
}
    {
        
          
        

        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
        
    }
}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this.formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        
    }
    get f() { return this.loginForm.controls; }
    
  
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.form.email, this.form.password)
            .pipe(first())
            .subscribe(
                data => {
                    console.log("emailaaaaaaaaa",this.form.email);

                 //  localStorage.setItem("firstName",data.firstName)
                   //localStorage.setItem("lastName",data.lastName)

                  // sessionStorage.setItem("firstName",data.firstname)
                  // sessionStorage.setItem("lastName",data.lastname)
                    console.log("hhhhh",data)
                  
                  
                 
                    if(this.authenticationService.currentUserValue.authorities.authority=="admin"){
                        this.router.navigate([this.returnUrl]);
                        this._fuseNavigationService.setCurrentNavigation(navigation);
                        this._fuseNavigationService.register('main1', navigation);
                
                        // Set the main navigation as our current navigation
                        this._fuseNavigationService.setCurrentNavigation('main1');
                   
                    }else   if(this.authenticationService.currentUserValue.authorities.authority=="architect"){
                        this.router.navigate([this.returnUrl]);
                        this._fuseNavigationService.setCurrentNavigation(navigation2);
                        this._fuseNavigationService.register('main2', navigation2);
                
                        // Set the main navigation as our current navigation
                        this._fuseNavigationService.setCurrentNavigation('main2');
                   
                
                    }else if(this.authenticationService.currentUserValue.authorities.authority=="developer") {
                        this.router.navigate([this.returnUrl]);
                        this._fuseNavigationService.setCurrentNavigation(navigation3);
                        this._fuseNavigationService.register('main3', navigation3);
                
                        // Set the main navigation as our current navigation
                        this._fuseNavigationService.setCurrentNavigation('main3');
                    } else { 
                        this.router.navigate(["validation"]);
                        this._fuseNavigationService.setCurrentNavigation(navigation4);
                        this._fuseNavigationService.register('main4', navigation4);
                
                        // Set the main navigation as our current navigation
                        this._fuseNavigationService.setCurrentNavigation('main4');

                    }
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
                
              
    }
}
