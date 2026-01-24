using Domain.Entities.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IUserRepository
    {
        // Basic CRUD
        Task<User?> GetUserByIdAsync(int id);
        Task<User?> GetUserByEmailAsync(string email);
        Task AddUserAsync(User user);
        Task UpdateUserAsync(User user);

        // User's Profile Loading
        Task<User?> GetUserWithProfileAsync(int userId);

        // Authentication
        Task<User?> GetUserForLoginAsync(string email);
        Task<bool> EmailExistsAsync(string email);

        // Security & Lockout
        //Task IncrementFailedLoginAttemptsAsync(User user);
        //Task ResetFailedLoginAttemptsAsync(User user);
        //Task LockUserAsync(User user, DateTime lockoutEnd);

        // Soft Deletion
        Task DeleteUserAsync(int userId);
    }
}


