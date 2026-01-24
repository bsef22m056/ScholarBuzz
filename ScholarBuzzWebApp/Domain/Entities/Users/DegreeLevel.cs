using Domain.Entities.UserProfile;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Users
{
    public class DegreeLevel
    {
        public int Id { get; set; }
        public string? Level { get; set; } // Undergraduate, Graduate, Master, Certification etc.

        public List<Education>? Educations { get; set; } // navigation Properties for Educations
    }
}