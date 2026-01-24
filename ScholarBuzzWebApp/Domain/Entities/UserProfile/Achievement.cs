using Domain.Entities.UserProfile;
using Domain.Entities.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.UserProfile
{
    public class Achievement
    {
        public int Id { get; set; }

        public int UserId { get; set; } // FK
        public User? User { get; set; } // Navigation Property for User

        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DateOnly DateReceived { get; set; }
    }
}