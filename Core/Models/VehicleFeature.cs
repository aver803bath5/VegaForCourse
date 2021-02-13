namespace VegaForCourse.Core.Models
{
    public class VehicleFeature
    {
        public int FeatureId { get; set; }
        public Feature Feature { get; set; }

        public int VehicleId { get; set; }
        public Vehicle Vehicle { get; set; }
    }
}