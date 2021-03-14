using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using VegaForCourse.Controllers.Resources;
using VegaForCourse.Core;
using VegaForCourse.Core.Models;

namespace VegaForCourse.Controllers
{
    // /api/vehicles/1/photos
    [ApiController]
    [Route("/api/vehicles/{vehicleId}/photos")]
    public class PhotosController : ControllerBase
    {
        private readonly IWebHostEnvironment _host;
        private readonly IVehicleRepository _repository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly PhotoSettings _photoSettings;

        public PhotosController(IWebHostEnvironment host, IVehicleRepository repository, IUnitOfWork unitOfWork,
            IMapper mapper, IOptions<PhotoSettings> options)
        {
            _host = host;
            _repository = repository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _photoSettings = options.Value;
        }

        [HttpPost]
        public async Task<IActionResult> Upload(int vehicleId, IFormFile file)
        {
            var vehicle = await _repository.GetVehicle(vehicleId, includeRelated: false);
            if (vehicle == null)
                return NotFound();

            if (file == null) return BadRequest("Null file");
            if (file.Length == 0) return BadRequest("Empty file");
            if (file.Length > _photoSettings.MaxBytes) return BadRequest("Max size exceeded");
            if (!_photoSettings.IsSupported(file.FileName)) return BadRequest("Invalid file type.");

            var uploadsFolderPath = Path.Combine(_host.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsFolderPath))
                Directory.CreateDirectory(uploadsFolderPath);

            var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadsFolderPath, fileName);

            await using var stream = new FileStream(filePath, FileMode.Create);
            await file.CopyToAsync(stream);

            var photo = new Photo {FileName = fileName};
            vehicle.Photos.Add(photo);
            await _unitOfWork.CompleteAsync();

            return Ok(_mapper.Map<Photo, PhotoResource>(photo));
        }
    }
}