import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { Todo } from '../../Models/todo';
import { TodoService } from '../../Services/todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  todos: Todo[]; 
  singletodo?: Todo; 
  newToDo?: Todo; 
  filteredTodos: Todo[];
  
  filterId: string = '';
  filterTitle: string = '';
  filterUserId: string = '';
  filterStatus: string = '';
 
  constructor(private todoService: TodoService, private router: Router) {
    this.todos = [];
    this.filteredTodos= []

  }
  ngOnInit(): void {
    this.fetchAllTodos();

  }
  // Fetches all Todo items from the service
  fetchAllTodos() {
    this.todoService.getAllTodo().subscribe({
      next: (response) => {
        this.todos = response;
        this.filteredTodos = response;
      },
      error: () => {
        console.log("Please Try Again");
      }

    });
  }
   // Opens the form to update a specific Todo item
   openUpdateTodoForm(id: number) {
    this.todoService.getByIdTodo(id).subscribe({
      next: (response) => {
        this.singletodo = response;
      },

      error: () => {
        console.log("Please Try Again");
      }
    })

  }
  // Closes the edit form
  closeEditForm() {
    this.singletodo = undefined;
  }
  // Deletes a specific Todo item
  deleteTodo(id: number) {
    // Confirm deletion with the user
    confirm("Are you sure!") ?

      this.todoService.deteleTodo(id).subscribe({
        next: () => {
          alert("Todo is deleted successfully")
          this.fetchAllTodos();// Refresh the list of todos after deletion
        },

        error: () => {
          console.log("Please Try Again");
        }

      }
      )
      : null;

  }
  // Saves the updated Todo item
  saveData(): void {
    if (this.singletodo) {
      this.todoService.updateTodo(this.singletodo.id, this.singletodo).subscribe({
        next: () => {
          alert("Todo updated successfully");
          this.fetchAllTodos(); // Refresh the list of todos after update
          this.closeEditForm(); // Close the edit form after saving
        },
        error: () => {
          console.error("Error updating todo");
        }
      });
    }
  }
  // Navigates to the Add Todo page
  navigateToAddNewTodo() {
    this.router.navigate(["/add-todo"]);;
  }
  
  // Applies filters to the Todo list
  applyFilters() {
    this.filteredTodos = this.todos.filter(todo =>
      (this.filterId === '' || todo.id.toString().includes(this.filterId)) &&
      (this.filterTitle === '' || todo.title.toLowerCase().includes(this.filterTitle.toLowerCase())) &&
      (this.filterUserId === '' || todo.userId.toString().includes(this.filterUserId)) &&
      (this.filterStatus === '' || 
        (this.filterStatus === 'completed' && todo.completed) ||
        (this.filterStatus === 'pending' && !todo.completed))
    );
  }

  // Resets all filters and restores the original todo list
  resetFilters() {
    this.filterId = '';
    this.filterTitle = '';
    this.filterUserId = '';
    this.filterStatus = '';
    this.filteredTodos = [...this.todos]; 
  }
  
}
