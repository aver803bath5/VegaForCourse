using System.ComponentModel.DataAnnotations;

namespace VegaForCourse.Controllers.Resources
{
    public class ContactResource
    {
        [Required]
        [MaxLength(255)]
        public string Name { get; set; }
        
        [MaxLength(255)]
        public string Email { get; set; }
        
        [Required]
        [MaxLength(255)]
        public string Phone { get; set; }    }
}