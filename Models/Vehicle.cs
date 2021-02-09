using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace VegaForCourse.Models
{
    public class Vehicle
    {
        public int Id { get; set; }

        public int ModelId { get; set; }
        public Model Model { get; set; }

        public bool IsRegistered { get; set; }

        public Contact Contact { get; set; }

        public DateTime LastUpdate { get; set; }

        public ICollection<VehicleFeature> VehicleFeatures { get; set; }

        public Vehicle()
        {
            VehicleFeatures = new Collection<VehicleFeature>();
        }
    }
}