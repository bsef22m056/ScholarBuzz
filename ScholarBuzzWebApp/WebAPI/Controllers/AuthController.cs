using Application.DTOs;
using Application.Interfaces;
using Application.Services;
using Domain.Entities;
using Domain.Entities.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
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
        [Authorize]
        [HttpPatch("ChangePassword")]
        public async Task<IActionResult> ChangePassword(ChangePasswordDTO dto)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized("UserId claim missing");

            int userId = int.Parse(userIdClaim.Value);

            await _userService.ChangePasswordAsync(userId, dto);

            return Ok(new { message = "Password changed successfully" });
        }

        // ================= FORGOT PASSWORD =================
        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordDTO dto)
        {
            await _userService.ForgotPasswordAsync(dto);

            return Ok(new
            {
                message = "If the email exists, a reset link has been sent."
            });
        }

        // ================= RESET PASSWORD =================
        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDTO dto)
        {
            await _userService.ResetPasswordAsync(dto);

            return Ok(new
            {
                message = "Password reset successfully"
            });
        }
    }
}
