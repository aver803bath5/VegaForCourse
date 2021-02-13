using System.Threading.Tasks;

namespace VegaForCourse.Core
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}