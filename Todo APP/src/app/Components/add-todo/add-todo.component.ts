import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../Models/todo';

import { TodoService } from '../../Services/todo.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css'
})
export class AddTodoComponent {
  newTodo: Todo;
  constructor(private todoService: TodoService, private router: Router) {
    this.newTodo = {} as Todo;
  }
  // Save the new Todo item 
  saveTodo() {
    if (this.newTodo.title!='' && this.newTodo.userId > 0){
      this.todoService.createTodo(this.newTodo).subscribe({
        next: (response) => {
          alert('Todo added successfully');
          this.router.navigate(["/home"]); //navigate to home
        },
        error: () => {
          alert('Failed to add todo');
        }
      });
    }
    else {
      alert('Should enter title and userid!');
    }
  }

  cancel() {
    this.router.navigate(["/home"]); //navigate to home without saving
  }
}
