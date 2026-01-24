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
    public class UserInterestRepository : IUserInterestRepository
    {
        private readonly ScholbuzzDbContext _context;

        public UserInterestRepository(ScholbuzzDbContext context)
        {
            _context = context;
        }

        public async Task<List<UserInterest>> GetByUserIdAsync(int userId)
        {
            return await _context.UserInterests
                .Where(ui => ui.UserId == userId)
                .ToListAsync();
        }

        public async Task AddRangeAsync(List<UserInterest> interests)
        {
            await _context.UserInterests.AddRangeAsync(interests);
            await _context.SaveChangesAsync();
        }

        public void RemoveRange(List<UserInterest> interests)
        {
            _context.UserInterests.RemoveRange(interests);
            _context.SaveChanges();
        }
    }
}
