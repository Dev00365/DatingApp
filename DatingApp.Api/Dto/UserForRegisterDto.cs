using System;
using System.ComponentModel.DataAnnotations;

namespace DatingApp.Api
{
    public class UserForRegisterDto
    {
        [Required]
        public string  Name { get; set; }
        [Required]
        [StringLength(15, MinimumLength=3, ErrorMessage="Password length must be in between 3 to 15")]
        public string password { get; set; }
        [Required]
        public string Gender { get; set; }
        [Required]
        public string KnownAs { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
        [Required]
        public string City { get; set; }
         [Required]
        public string Country { get; set; }

        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }


        public UserForRegisterDto()
        {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
        }

    }
}