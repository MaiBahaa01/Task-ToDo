using TodoApi.Repositories;

namespace TodoApi.UnitOfWork
{
    public interface IUnitOfWork: IDisposable
    {
        ITodoRepository Todos { get; }
        Task<bool> SaveAsync();
    }
}
