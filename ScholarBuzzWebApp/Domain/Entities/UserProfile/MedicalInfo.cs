using Domain.Entities.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.UserProfile
{
    public class MedicalInfo
    {
        public int Id { get; set; }
        
        public int UserID { get; set; } // FK
        public User? User { get; set; } // Navigation Property for user

        public string? HealthNotes { get; set; }
        public bool DisabilityStatus { get; set; }
        public string DisabilityDetails { get; set; } = string.Empty;
    }
}