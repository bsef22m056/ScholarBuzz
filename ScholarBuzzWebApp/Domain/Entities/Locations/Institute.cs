using Domain.Entities.UserProfile;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Locations
{
    public class Institute
    {
        public int Id { get; set; }

        // Navigation Properties :-
        public int LocationId { get; set; } // FK
        public Location? Location { get; set; } // For Location
        
        public List<Education>? Educations { get; set; } // For Educations

        public string Name { get; set; }
    }
}
