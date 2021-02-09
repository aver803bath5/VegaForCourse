using AutoMapper;
using VegaForCourse.Controllers.Resources;
using VegaForCourse.Models;

namespace VegaForCourse.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Make, MakeResource>();
            CreateMap<Model, ModelResource>();
        }
    }
}