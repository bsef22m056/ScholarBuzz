using Application.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Domain.Interfaces;
using Domain.Entities.Users;

namespace Infrastructure.Services
{
    public class JwtTokenService : IJwtTokenService
    {
        private readonly IConfiguration _config;
        private readonly IRoleRepository _roleRepo;
        public JwtTokenService(IConfiguration config, IRoleRepository roleRepo)
        {
            _config = config;
            _roleRepo = roleRepo;
        }
        public string GenerateToken(User user)
        {
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config["Jwt:Key"]));

            var credentals = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var role = _roleRepo.GetRoleByIdAsync(user.RoleId);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, role.Result.Name)
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credentals
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
