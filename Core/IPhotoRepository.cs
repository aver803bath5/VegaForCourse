using System.Collections.Generic;
using System.Threading.Tasks;
using VegaForCourse.Core.Models;

namespace VegaForCourse.Core
{
    public interface IPhotoRepository
    {
        Task<IEnumerable<Photo>> GetPhotos(int vehicleId);
    }
}