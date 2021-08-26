import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'app/_services';
import { first } from 'rxjs/operators';

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
        private authenticationService: AuthenticationService) {
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
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
}
