import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http: HttpClient = inject(HttpClient);

  public async login(credetials: {
    email: string;
    password: string;
  }): Promise<any> {
    const headers = new HttpHeaders().append(
      'Authorization',
      environment.key_api
    );

    const formdata = new FormData();
    formdata.append('email', credetials.email);
    formdata.append('password', credetials.password);

    return await lastValueFrom(
      this._http.post(`http://localhost/mdp/api/login`, formdata, {
        headers,
      })
    );
  }

  public async register(dataUser: any): Promise<any> {
    const headers = new HttpHeaders().append(
      'Authorization',
      environment.key_api
    );

    return await lastValueFrom(
      this._http.post(`${environment.base_url}/api/login`, dataUser, {
        headers,
      })
    );
  }
}
