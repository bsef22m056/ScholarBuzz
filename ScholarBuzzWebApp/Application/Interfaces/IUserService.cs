using Application.DTOs;
using Domain.Entities.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IUserService
    {
        Task RegisterStudentAsync(User user, string password);
        Task<User> LoginAsync(string email, string password);
        Task<ViewProfileDTO> GetProfileAsync(int userId);
        Task UpdateProfileAsync(int userId, UpdateProfileDTO dto);
    }
}
