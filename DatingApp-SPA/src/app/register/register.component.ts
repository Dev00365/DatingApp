import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFormHome: any;
  @Output() cancelRegister = new EventEmitter();
  bsConfig: Partial<BsDatepickerConfig>;

user: User;
registerForm: FormGroup;
  constructor(private authService: AuthService , private router: Router,
     private alertifyService: AlertifyService, private fb: FormBuilder) { }

  ngOnInit() {
    this.bsConfig = {
    containerClass: 'theme-red'
    },
    this.createRegistraionForm();
    // this.registerForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormCont rol('', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]),
    //   confirmPassword: new FormControl('', Validators.required)
    // }, this.passwordMatchValidator);
  }

  createRegistraionForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      name: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],

      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]],
      confirmPassword: ['',  Validators.required]
    }, { validator: this.passwordMatchValidator });
  }
passwordMatchValidator(g: FormGroup) {
return g.get('password').value === g.get('confirmPassword').value ? null : {'misMatch': true};
}
  register() {

    if (this.registerForm.valid) {


     this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        this.alertifyService.success('Registraion Successfull');
      }, error => {
        this.alertifyService.error(error);
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/members']);
        });
      });
    }
    // this.authService.register(this.model).subscribe(() => {
    //  this.alertifyService.success('registraion successfull');
    // }, error => {
    //   this.alertifyService.error(error);
    // });
    console.log(this.registerForm.value);
  }

  cancel() {
    this.cancelRegister.emit(false);
  console.log('cancelled');
}




}
