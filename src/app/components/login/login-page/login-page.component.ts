import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthHttpService} from "../../../api/services/auth-http.service";
import {Login} from "../../../api/models/Login";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  form = new FormGroup({
    username: new FormControl("", Validators.minLength(4)),
    password : new FormControl("", Validators.minLength(4))
  });

  showError : boolean = false;
  errorMessage? : string;


  constructor(@Inject(FormBuilder) private formBuilder : FormBuilder,
              private authService : AuthHttpService,
              private router : Router) { }

  ngOnInit(): void {
  }

  onSubmit() : void{
    const login : Login = this.form.value as Login;

    this.authService.login(login)
      .subscribe((response) =>
      {
          if(response.isSuccessful)
          {
            this.router.navigate(["chats"]);
          }
          else {
              this.showError = true;
              this.errorMessage = response.errorMessage
          }
      });
  }
}
