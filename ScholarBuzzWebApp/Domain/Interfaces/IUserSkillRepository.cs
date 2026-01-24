using Domain.Entities.Joins;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IUserSkillRepository
    {
        Task<List<UserSkill>> GetByUserIdAsync(int userId);
        Task AddRangeAsync(List<UserSkill> skills);
        Task RemoveRangeAsync(List<UserSkill> skills);
    }

}
