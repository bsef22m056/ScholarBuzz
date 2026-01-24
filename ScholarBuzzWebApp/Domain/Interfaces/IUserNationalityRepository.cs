using Domain.Entities.Joins;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IUserNationalityRepository
    {
        Task<List<UserNationality>> GetByUserIdAsync(int userId);
        Task AddRangeAsync(List<UserNationality> nationalities);
        Task RemoveRangeAsync(List<UserNationality> nationalities);
    }
}
