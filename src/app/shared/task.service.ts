import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  formData : Task;
  list : Task[];
  readonly url = "http://localhost:62109/api/task";

  constructor(private http: HttpClient) { }

  postTask(formData: Task){

    let param: Object = {
        "titulo": formData.Titulo,
        "status":formData.Status,
        "descricao":formData.Descricao
    }
  
    return this.http.post(this.url, param);
  }

  putTask(formData: Task){
    let param: Object = {
      "id":formData.Id,
      "titulo": formData.Titulo,
      "status":formData.Status,
      "descricao":formData.Descricao
    }
    return this.http.put(this.url + '/' +formData.Id, formData);
  }

  refreshList(){
    return this.http.get(this.url);
 
    /*this.http.get(this.url).toPromise().then(res => 
      this.list = res as Task[]
    );*/
   
  }

  deleteTask(id: number){
    return this.http.delete(this.url + '/' +id );
  }
}
