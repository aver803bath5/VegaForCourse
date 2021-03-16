using System.ComponentModel.DataAnnotations;

namespace VegaForCourse.Core.Models
{
    public class Photo
    {
        public int Id { get; set; }
        
        [Required]
        [MaxLength(255)]
        public string FileName { get; set; }

        public int  VehicleId { get; set; }
    }
}