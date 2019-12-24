import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService, AuthenticationService } from '../_services';

@Component({templateUrl: 'profile.component.html'})
export class ProfileComponent implements OnInit {
    profileForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private userService: UserService,
 ) {
         // redirect to home if already logged in
         if (this.authenticationService.currentUserValue) { 
             this.router.navigate(['/profile']);
         }
    }

    ngOnInit() {

    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.profileForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.delete(this.profileForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Delete successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
