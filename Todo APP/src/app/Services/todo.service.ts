import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { Todo } from '../Models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  url:string
  constructor(
    private httpService : HttpService, 
  ) {
    this.url="ToDo"
   }
   //Get All Todo 
   getAllTodo():Observable<Todo[]>{
    return this.httpService.get<Todo[]>(`${this.url}`)
   }
   //Get specific Todo with id
   getByIdTodo(id:number):Observable<Todo>{
    return this.httpService.get<Todo>(`${this.url}/${id}`)
   }
   //Create new Todo
   createTodo(data: Todo): Observable<Todo> {
    return this.httpService.post<Todo>(`${this.url}`, data);
  }
   //Update Todo
   updateTodo(id:number,data:Todo):Observable<void>{
    return this.httpService.put<void>(`${this.url}/${id}`,data)
   }
     //Delete specific Todo with id
   deteleTodo(id:number):Observable<void>{
    return this.httpService.delete<void>(`${this.url}/${id}`)
   }
}
