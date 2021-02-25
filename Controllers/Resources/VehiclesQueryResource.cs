namespace VegaForCourse.Controllers.Resources
{
    public class VehiclesQueryResource
    {
        public int? MakeId { get; set; }
        public int? ModelId { get; set; }
        
        public string SortBy { get; set; }
        public bool IsSortAscending { get; set; }
    }
}