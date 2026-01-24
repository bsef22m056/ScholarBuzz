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
    public class UserNationalityRepository : IUserNationalityRepository
    {
        private readonly ScholbuzzDbContext _context;

        public UserNationalityRepository(ScholbuzzDbContext context)
        {
            _context = context;
        }

        public async Task<List<UserNationality>> GetByUserIdAsync(int userId)
        {
            return await _context.UserNationalities
                .Where(un => un.UserId == userId)
                .ToListAsync();
        }

        public async Task AddRangeAsync(List<UserNationality> nationalities)
        {
            await _context.UserNationalities.AddRangeAsync(nationalities);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveRangeAsync(List<UserNationality> nationalities)
        {
            _context.UserNationalities.RemoveRange(nationalities);
            await _context.SaveChangesAsync();
        }
    }

}
