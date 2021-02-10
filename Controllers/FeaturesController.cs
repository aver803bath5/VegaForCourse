using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VegaForCourse.Controllers.Resources;
using VegaForCourse.Models;
using VegaForCourse.Persistence;

namespace VegaForCourse.Controllers
{
    public class FeaturesController : Controller
    {
        private readonly VegaDbContext _context;
        private readonly IMapper _mapper;

        public FeaturesController(VegaDbContext context, IMapper _mapper)
        {
            _context = context;
            this._mapper = _mapper;
        }

        [HttpGet("/api/features")]
        public async Task<IActionResult> GetFeatures()
        {
            var features = await _context.Features.ToListAsync();
            return Ok(features.Select(_mapper.Map<Feature, FeatureResource>));
        }
    }
}