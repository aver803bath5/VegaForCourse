
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace VegaForCourse.Models
{
    public class Feature
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<VehicleFeature> VehicleFeatures { get; set; }

        public Feature()
        {
            VehicleFeatures = new Collection<VehicleFeature>();
        }
    }
}