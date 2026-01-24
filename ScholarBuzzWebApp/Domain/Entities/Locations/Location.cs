using Domain.Entities.Users;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Locations
{
    public class Location
    {
        public int Id { get; set; }

        public int? ParentId { get; set; } // FK for Parent location of a location i.e., ParentId("Lahore") = "Punjab"
        public Location? Parent { get; set; } // Navigation Property for Parent location of a location

        public List<Location>? Childrens { get; set; } // Navigation Property for child locations of a location

        public string Name { get; set; } = string.Empty;
        public LocationType Type { get; set; } // City, Province, State, Country, Region
        
    }
}
