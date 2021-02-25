using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using VegaForCourse.Controllers.Resources;
using VegaForCourse.Core;
using VegaForCourse.Core.Models;

namespace VegaForCourse.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class VehiclesController : Controller
    {
        private readonly IMapper _mapper;
        private readonly IVehicleRepository _repository;
        private readonly IUnitOfWork _unitOfWork;

        public VehiclesController(IMapper mapper, IVehicleRepository repository, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _repository = repository;
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody] SaveVehicleResource saveVehicleResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vehicle = _mapper.Map<SaveVehicleResource, Vehicle>(saveVehicleResource);
            vehicle.LastUpdate = DateTime.Now;

            _repository.Add(vehicle);
            await _unitOfWork.CompleteAsync();

            vehicle = await _repository.GetVehicle(vehicle.Id);

            var result = _mapper.Map<Vehicle, VehicleResource>(vehicle);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody] SaveVehicleResource saveVehicleResource)
        {
            var vehicle = await _repository.GetVehicle(id);

            if (vehicle == null)
                return NotFound();

            _mapper.Map(saveVehicleResource, vehicle);
            await _unitOfWork.CompleteAsync();

            vehicle = await _repository.GetVehicle(vehicle.Id);
            var result = _mapper.Map<Vehicle, VehicleResource>(vehicle);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var vehicle = await _repository.GetVehicle(id, includeRelated: false);

            if (vehicle == null)
                return NotFound();

            _repository.Remove(vehicle);
            await _unitOfWork.CompleteAsync();

            return Ok(id);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle(int id)
        {
            var vehicle = await _repository.GetVehicle(id);

            if (vehicle == null)
                return NotFound();

            var vehicleResource = _mapper.Map<Vehicle, VehicleResource>(vehicle);
            return Ok(vehicleResource);
        }

        [HttpGet]
        public async Task<IActionResult> GetVehicles()
        {
            var vehicles = await _repository.GetVehicles();

            return Ok(_mapper.Map<IEnumerable<Vehicle>, IEnumerable<VehicleResource>>(vehicles));
        }
    }
}