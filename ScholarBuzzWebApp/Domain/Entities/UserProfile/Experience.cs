using Domain.Entities.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.UserProfile
{
    public class Experience
    {
        public int Id { get; set; }

        public int UserId { get; set; } // FK
        public User? User { get; set; } // Navigation Property for User

        public string Organization { get; set; } = string.Empty;
        public string Designation { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
    }
}