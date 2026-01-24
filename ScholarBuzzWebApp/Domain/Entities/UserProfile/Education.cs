using Domain.Entities.Locations;
using Domain.Entities.Users;
using Microsoft.VisualBasic.FileIO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.UserProfile
{
    public class Education
    {
        public int Id { get; set; }

        // Navigation Properties :-
        public int UserId { get; set; } // FK
        public User? User { get; set; } // For User

        public int DegreeLevelId { get; set; } // FK
        public DegreeLevel? DegreeLevel { get; set; } // For DegreeLevel

        public int InstituteId { get; set; } // FK
        public Institute? Institute { get; set; } // For Institute
        
        public int FieldId { get; set; } // FK
        public Field? Field { get; set; } // For Institute

        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public double? CGPA { get; set; }
        public double? Percentage { get; set; }
        public double? Scale { get; set; }
        public string? HonorsAward { get; set; }
    }
}