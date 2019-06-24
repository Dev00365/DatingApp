using System.ComponentModel.DataAnnotations;

namespace DatingApp.Api
{
    public class UserForRegisterDto
    {
        [Required]
        public string  Username { get; set; }
        [Required]
        [StringLength(15, MinimumLength=3, ErrorMessage="Password length must be in between 3 to 15")]
        public string password { get; set; }
    }
}