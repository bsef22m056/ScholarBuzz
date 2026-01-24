using Domain.Entities.UserProfile;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Users
{
    public class Field
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty; // Software Enginearing, Artificial Inteligence, Mechanical Engineering etc.

        public List<Education>? Educations { get; set; } // Navigation Property for Educations
    }
}
