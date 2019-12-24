import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService, AuthenticationService } from 'src/app/_services';

@Component({templateUrl: 'editprofile.component.html'})
export class EditprofileComponent implements OnInit {
    editprofileForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) { 
           // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/editprofile']);
    }
    }

    ngOnInit() {
        this.editprofileForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.editprofileForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.editprofileForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.editprofileForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Update successful', true);
                    this.router.navigate(['./login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });        
    }
}
