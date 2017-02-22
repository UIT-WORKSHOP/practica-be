using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CRUD_API_BASIC.Models
{
    public class Profile
    {
        public string ProfileName { get; set; }
        public string UserName { get; set; } //key
        public string Email { get; set; }
        public string Password { get; set; }
    }
}