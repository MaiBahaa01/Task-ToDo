using Microsoft.EntityFrameworkCore;
using TodoApi.Model;

namespace TodoApi.Repositories
{
    public class TodoRepository : ITodoRepository
    {
        private readonly ApplicationDbContext _context;

        public TodoRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        // Retrieves all Todo items from the database
        public async Task<IEnumerable<Todo>> GetAllTodosAsync()
        {
            return await _context.Todos.ToListAsync();
        }
        //Retrieves a Todo item by its ID 
        public async Task<Todo> GetTodoByIdAsync(int id)
        {
            return await _context.Todos.FindAsync(id);
        }
        //Adds a new Todo item to the database
        public async Task AddTodoAsync(Todo todo)
        {
            await _context.Todos.AddAsync(todo);
        }
        // Updates an existing Todo item in the database.
        public void UpdateTodo(Todo todo)
        {
            _context.Todos.Update(todo);
        }
        // Deletes a Todo item from the database.
        public void DeleteTodo(Todo todo)
        {
            _context.Todos.Remove(todo);
        }
        // Saves changes made in the repository to the database
        public async Task<bool> SaveAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
