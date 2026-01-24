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
    public class RoleRepository : IRoleRepository
    {
        private readonly ScholbuzzDbContext _context;
        public RoleRepository(ScholbuzzDbContext context)
        {
            _context = context;
        }
        public async Task AddRoleAsync(Role role)
        {
            await _context.Roles.AddAsync(role);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteRoleAsync(int id)
        {
            var role = await _context.Roles.FindAsync(id);

            if (role != null)
            {
                _context.Roles.Remove(role);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Role>> GetAllRolesAsync()
        {
            return await _context.Roles.ToListAsync();
        }

        public async Task<Role?> GetRoleByIdAsync(int id)
        {
            var existing = await _context.Roles.FirstOrDefaultAsync(r => r.Id == id);

            if (existing == null)
                throw new ArgumentException("Role Not Found!");

            return existing;
        }

        public async Task<Role?> GetRoleByNameAsync(string roleName)
        {
            var existing = await _context.Roles.FirstOrDefaultAsync(r => r.Name == roleName);

            if (existing == null)
                throw new ArgumentException("Role Not Found!");

            return existing;
        }

        public async Task UpdateRoleAsync(Role role)
        {
            var existing = _context.Roles.Find(role.Id);

            if (existing == null)
                throw new ArgumentException("User Not Found!");

            existing.Name = role.Name;

            await _context.SaveChangesAsync();
        }
    }
}
