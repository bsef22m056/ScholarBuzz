using Application.Interfaces;
using Application.Services;
using Domain.Entities;
using Domain.Entities.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IJwtTokenService _tokenService;
        public AuthController(IUserService userService, IJwtTokenService tokenService)
        {
            _userService = userService;
            _tokenService = tokenService;
        }

        [HttpPost("RegisterStudent")]
        public async Task<IActionResult> RegisterStudent(StudentRegisterDTO dto)
        {
            var user = new User
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                DateOfBirth = dto.DateOfBirth,
                Gender = dto.Gender
            };

            await _userService.RegisterStudentAsync(user, dto.Password);

            return Ok(new { message = "Student registered successfully." });
        }
        [HttpGet("LoginUser")]
        public async Task<IActionResult> Login(LoginDTO dto)
        {
            var user = await _userService.LoginAsync(dto.Email, dto.Password);

            var token = _tokenService.GenerateToken(user);
            
            return Ok(new
            {
                message = "Login Successful!",
                token = token,
                userId = user.Id,
                role = user.Role.Name
            });
        }
        //[HttpGet("ForgotPassword")]
        //public IActionResult ChangePassword()
        //{

        //}
    }
}
