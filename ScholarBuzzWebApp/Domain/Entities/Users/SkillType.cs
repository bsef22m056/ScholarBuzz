using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Users
{
    public class SkillType
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string IsApproved { get; set; }
    }
}
