using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace VegaForCourse.Core.Models
{
    public class Feature
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<VehicleFeature> Vehicles { get; set; }

        public Feature()
        {
            Vehicles = new Collection<VehicleFeature>();
        }
    }
}