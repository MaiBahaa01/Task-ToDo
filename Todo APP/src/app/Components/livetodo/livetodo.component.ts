import { Component, OnInit } from '@angular/core';
import { LivetodoService } from '../../Services/livetodo.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-livetodo',
  standalone: true,
  imports: [CommonModule, NavbarComponent,FormsModule],
  templateUrl: './livetodo.component.html',
  styleUrl: './livetodo.component.css'
})
export class LivetodoComponent implements OnInit{
  todos: any[] = [];
  totalItems: number = 0;
  pageNumber: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  filteredTodos: any[] = []; 
  filterId: string = '';
  filterTitle: string = '';
  filterCompleted: string = '';
  filterUserId: string = '';

  constructor(private liveTodoService: LivetodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }
 // Fetches todos from the service based on current page and page size
  loadTodos(): void {
    this.liveTodoService.getTodos(this.pageNumber, this.pageSize).subscribe(response => {
      this.todos = response.items;
      this.totalItems = response.totalItems;
      this.totalPages = response.totalPages;
      this.applyFilters();
    });
  }
  // Updates the current page number and reloads the todos
  onPageChange(page: number): void {
    this.pageNumber = page;
    this.loadTodos();
  }
// Applies filters to the Todo list
applyFilters(): void {
  this.filteredTodos = this.todos.filter(todo => {
    return (
      (this.filterId === '' || todo.id.toString().includes(this.filterId)) &&
      (this.filterTitle === '' || todo.title.toLowerCase().includes(this.filterTitle.toLowerCase())) &&
      (this.filterCompleted === '' || todo.completed.toString() === this.filterCompleted) &&
      (this.filterUserId === '' || todo.userId.toString().includes(this.filterUserId))
    );
  });
}
 // Resets all filters and restores the original todo list
 resetFilters() {
  this.filterId = '';
  this.filterTitle = '';
  this.filterUserId = '';
  this.filterCompleted = '';
  this.filteredTodos = [...this.todos]; 
}

}
