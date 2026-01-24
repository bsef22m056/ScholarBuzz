using Domain.Entities.Joins;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Users
{
    public class Nationality
    {
        public int Id { get; set; }

        // Join Table
        public List<UserNationality>? UserNationalities { get; set; } // Navigation Property for UserNationality
        
        public string Name { get; set; } = string.Empty; // Pakistani, American, Indian etc.
    }
}