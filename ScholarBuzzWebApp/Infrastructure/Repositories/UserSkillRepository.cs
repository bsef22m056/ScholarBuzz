using Domain.Entities.Joins;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class UserSkillRepository : IUserSkillRepository
    {
        private readonly ScholbuzzDbContext _context;

        public UserSkillRepository(ScholbuzzDbContext context)
        {
            _context = context;
        }

        public async Task<List<UserSkill>> GetByUserIdAsync(int userId)
        {
            return await _context.UserSkills
                .Where(us => us.UserId == userId)
                .ToListAsync();
        }

        public async Task AddRangeAsync(List<UserSkill> skills)
        {
            await _context.UserSkills.AddRangeAsync(skills);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveRangeAsync(List<UserSkill> skills)
        {
            _context.UserSkills.RemoveRange(skills);
            await _context.SaveChangesAsync();
        }
    }


}
