using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace API.DTO
{
    public class RegisterDto
    {
        [Required]
        public string UserName {get;set; }
        [Required]
        public string DisplayName {get;set; }
        [Required]
        public string Email {get;set; }
         [Required]
        //[RegularExpression()]
        public string Password {get;set; }
    }
}