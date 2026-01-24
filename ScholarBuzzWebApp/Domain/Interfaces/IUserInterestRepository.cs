using Domain.Entities.Joins;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IUserInterestRepository
    {
        public Task<List<UserInterest>> GetByUserIdAsync(int userId);
        public Task AddRangeAsync(List<UserInterest> interests);
        public void RemoveRange(List<UserInterest> interests);
    }

}
