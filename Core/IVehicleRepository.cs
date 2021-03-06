using System.Collections.Generic;
using System.Threading.Tasks;
using VegaForCourse.Core.Models;

namespace VegaForCourse.Core
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
        Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery queryObj);
        void Add(Vehicle vehicle);
        void Remove(Vehicle vehicle);
    }
}