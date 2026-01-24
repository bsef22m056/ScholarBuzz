using Domain.Entities.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Joins
{
    public class UserNationality
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public int NationalityId { get; set; }
        public Nationality Nationality { get; set; }
    }

}
