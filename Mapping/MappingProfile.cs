using System.Linq;
using AutoMapper;
using VegaForCourse.Controllers.Resources;
using VegaForCourse.Core.Models;

namespace VegaForCourse.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Domain to API Resource
            CreateMap<Make, MakeResource>();
            CreateMap<Make, KeyValuePairResource>();
            CreateMap<Model, KeyValuePairResource>();
            CreateMap<Feature, KeyValuePairResource>();
            CreateMap<Contact, ContactResource>();
            CreateMap<Vehicle, SaveVehicleResource>()
                .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => vf.FeatureId)));
            CreateMap<Vehicle, VehicleResource>()
                .ForMember(vr => vr.Make,  opt => opt.MapFrom(v => v.Model.Make))
                .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => new KeyValuePairResource(){Id = vf.FeatureId, Name = vf.Feature.Name})));

            // API Resource to Domain
            CreateMap<ContactResource, Contact>();
            CreateMap<SaveVehicleResource, Vehicle>()
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