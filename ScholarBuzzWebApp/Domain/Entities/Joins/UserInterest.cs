using Domain.Entities.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Joins
{
    public class UserInterest
    {
        public int UserId { get; set; }
        public User user { get; set; }
        public int InterestId { get; set; }
        public InterestType Interest { get; set; }
    }
}
