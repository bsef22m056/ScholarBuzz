using Domain.Entities.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Joins
{
    public class UserSkill
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public int SkillTypeId { get; set; }
        public SkillType SkillType { get; set; }

        public string? ProficiencyLevel { get; set; } // Beginner, Intermediate, Advanced
    }
}
