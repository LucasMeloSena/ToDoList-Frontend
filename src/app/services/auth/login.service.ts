import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface LoginParams {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private http: HttpClient) {}

  async login(params: LoginParams): Promise<void> {
    const response = this.http.post<LoginParams>('', params)
    console.log(response)
  }
}
