using Domain.Entities.Users;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ScholbuzzDbContext _context;
        public UserRepository(ScholbuzzDbContext context)
        {
            _context = context;
        }
        public async Task AddUserAsync(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteUserAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            
            if (user != null)
            {
                user.IsDeleted = true;
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> EmailExistsAsync(string email)
        {
            return await _context.Users.AnyAsync(u => u.Email == email);
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            var existing = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            //if (existing == null)
            //    throw new ArgumentException("User Not Found!");
            
            return existing;
        }

        public async Task<User?> GetUserByIdAsync(int id)
        {
            var existing = await _context.Users.FindAsync(id);

            if (existing == null)
                throw new ArgumentException("User Not Found!");

            return existing;
        }

        public Task<User?> GetUserForLoginAsync(string email)
        {
            throw new NotImplementedException();
        }

        public async Task<User?> GetUserWithProfileAsync(int userId)
        {
            return await _context.Users
                .Include(u => u.Educations)
                .Include(u => u.Experiences)
                .Include(u => u.Achievements)
                .Include(u => u.FinancialInfo)
                .Include(u => u.MedicalInfo)
                .Include(u => u.Location)
                .Include(u => u.UserNationalities)
                .FirstOrDefaultAsync(u => u.Id == userId && !u.IsDeleted);
        }

        public async Task UpdateUserAsync(User user)
        {
            var existing = _context.Users.Find(user.Id);
            
            if (existing == null)
                throw new ArgumentException("User Not Found!");
            
            existing.FirstName = user.FirstName;
            existing.LastName = user.LastName;
            existing.Email = user.Email;
            existing.PhoneNumber = user.PhoneNumber;
            existing.DateOfBirth = user.DateOfBirth;
            existing.Gender = user.Gender;
            existing.Role = user.Role;
            existing.PasswordHash = user.PasswordHash;
            existing.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
        }
    }
}
