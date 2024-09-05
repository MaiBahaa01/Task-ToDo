using TodoApi.Model;
using TodoApi.Repositories;

namespace TodoApi.UnitOfWork
{// Implementation of the Unit of Work pattern for managing database transactions.
    public class AppUnitOfWork: IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        private ITodoRepository _todoRepository;

        public AppUnitOfWork(ApplicationDbContext context)
        {
            _context = context;
        }
        //Gets the Todo repository for managing Todo items.
        public ITodoRepository Todos => _todoRepository ??= new TodoRepository(_context);
        //Saves changes made in the Unit of Work to the database.
        public async Task<bool> SaveAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        // Disposes the Unit of Work and releases the database context.
        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
