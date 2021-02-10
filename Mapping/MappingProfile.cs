using System.Linq;
using AutoMapper;
using VegaForCourse.Controllers.Resources;
using VegaForCourse.Models;

namespace VegaForCourse.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Domain to API Resource
            CreateMap<Make, MakeResource>();
            CreateMap<Model, ModelResource>();
            CreateMap<Feature, FeatureResource>();
            CreateMap<Contact, ContactResource>();
            CreateMap<Vehicle, VehicleResource>()
                .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => vf.FeatureId)));


            // API Resource to Domain
            CreateMap<ContactResource, Contact>();
            CreateMap<VehicleResource, Vehicle>()
                .ForMember(v => v.Id, opt => opt.Ignore())
                .ForMember(v => v.Features, opt => opt.Ignore())
                .AfterMap((vr, v) =>
                {
                    // Remove unselected features
                    var removedFeatures = v.Features.Where(vf => !vr.Features.Contains(vf.FeatureId));
                    foreach (var f in removedFeatures)
                        v.Features.Remove(f);

                    // Add new features
                    var addedFeatures = vr.Features.Where(id => v.Features.All(vf => vf.FeatureId != id))
                        .Select(id => new VehicleFeature() {FeatureId = id});
                    foreach (var f in addedFeatures)
                        v.Features.Add(f);
                });
        }
    }
}