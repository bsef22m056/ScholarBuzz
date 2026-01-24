using Domain.Entities.Joins;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace Domain.Entities.Users
{
    public class InterestType
    {
        public int Id { get; set; }

        // Join table
        public List<UserInterest>? UserInterests { get; set; } // Navigation Property for UserInterest

        public string Name { get; set; } // Unique
        public bool IsApproved { get; set; } // Default:True
        public DateTime CreatedAt { get; set; }
    }
}