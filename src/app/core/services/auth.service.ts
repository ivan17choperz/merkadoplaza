import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = signal(environment.base_url);

  private _http: HttpClient = inject(HttpClient);

  public login(credentials: {
    email: string;
    password: string;
  }): Observable<any> {
    return this._http.post(`${this.url()}/login`, credentials);
  }

  public async register(dataUser: any): Promise<any> {
    return await lastValueFrom(
      this._http.post(`${environment.base_url}/register`, dataUser)
    );
  }

  public async getDepartments(): Promise<any> {
    const data = await lastValueFrom(
      this._http.get(`${environment.base_url}/departments`)
    );

    return data;
  }

  public async getCities(): Promise<any> {
    const data = await lastValueFrom(
      this._http.get(`${environment.base_url}/cities`)
    );

    return data;
  }
}
