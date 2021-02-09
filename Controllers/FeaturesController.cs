using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VegaForCourse.Models;
using VegaForCourse.Persistence;

namespace VegaForCourse.Controllers
{
    public class FeaturesController : Controller
    {
        private readonly VegaDbContext _context;

        public FeaturesController(VegaDbContext context)
        {
            _context = context;
        }

        [HttpGet("/api/features")]
        public async Task<IEnumerable<Feature>> GetFeatures()
        {
            var features = await _context.Features.ToListAsync();
            return features;
        }
    }
}