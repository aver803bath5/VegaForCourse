using Microsoft.AspNetCore.Mvc;
using VegaForCourse.Models;

namespace VegaForCourse.Controllers
{
    [Route("/api/vehicles")]
    public class VehiclesController : Controller
    {
        [HttpPost]
        public IActionResult CreateVehicle([FromBody] Vehicle vehicle)
        {
            return Ok(vehicle);
        }
    }
}