import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFormHome: any;
  @Output() cancelRegister = new EventEmitter();

model: any = {};
registerForm: FormGroup;
  constructor(private authService: AuthService ,
     private alertifyService: AlertifyService, private fb: FormBuilder) { }

  ngOnInit() {

    this.createRegistraionForm();
    // this.registerForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]),
    //   confirmPassword: new FormControl('', Validators.required)
    // }, this.passwordMatchValidator);
  }

  createRegistraionForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
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
