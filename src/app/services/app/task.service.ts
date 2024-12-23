import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { injectMutation } from "@tanstack/angular-query-experimental";
import { environment } from "../../../environments/environment.development";
import { firstValueFrom } from "rxjs";
import { Response } from "../../models/response";
import { Task } from "../../models/task";

@Injectable({ providedIn: "root" })
export class TaskService {
  constructor(private http: HttpClient) {}

  createMutation = injectMutation(() => ({
    mutationFn: (task: Task) => this.createTaskApi(task),
  }));
  deleteMutation = injectMutation(() => ({
    mutationFn: (id: string) => this.deleteTaskApi(id),
  }));

  private async createTaskApi(task: Task): Promise<Response<string>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    });
    const response = await firstValueFrom(this.http.post<Promise<Response<string>>>(`${environment.apiUrl}/task/register`, task, { headers }));
    return response;
  }

  async createTask(task: Task) {
    const response = await this.createMutation.mutateAsync(task);
    if (response.error) throw new Error();
  }

  private async deleteTaskApi(id: string): Promise<Response<null>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    });
    return await firstValueFrom(this.http.delete<Promise<Response<null>>>(`${environment.apiUrl}/task/${id}`, { headers }));
  }

  async deleteTask(id: string) {
    const response = await this.deleteMutation.mutateAsync(id);
    if (response.error) throw new Error();
  }

  async fetchTasksApi(name?: string): Promise<Response<Task[]>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    });
    let params = new HttpParams();
    if (name) {
      params = params.set("name", name);
    }
    const response = await firstValueFrom(this.http.get<Promise<Response<Task[]>>>(`${environment.apiUrl}/task`, { headers, params }));
    return response;
  }
}
