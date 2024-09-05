using TodoApi.Model;

namespace TodoApi.Repositories
{
    public interface ITodoRepository
    {
        Task<IEnumerable<Todo>> GetAllTodosAsync();
        Task<Todo> GetTodoByIdAsync(int id);
        Task AddTodoAsync(Todo todo);
        void UpdateTodo(Todo todo);
        void DeleteTodo(Todo todo);
        Task<bool> SaveAsync();
    }
}
