using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Users
{
    public class Role
    {
        public int Id { get; set; }
        public List<User>? Users { get; set; } // Navigation Property for Users
        public string Name { get; set; } = string.Empty; // e.g., "Admin", "Student".
    }
}
