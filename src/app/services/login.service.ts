import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ILoginResponse } from './../interfaces/login-response.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly _httpClient = inject(HttpClient);

  login(username: string, password: string){
    return this._httpClient.post< ILoginResponse >('http://localhost:3000/login', {
    username: username,
    password: password,
    }).pipe(
      map((tokenResponse) => {
        localStorage.setItem('token', tokenResponse.token);

        return tokenResponse;
      })
    );
  }

}
