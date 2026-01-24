using Application.DTOs;
using Application.Interfaces;
using Domain.Entities.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IJwtTokenService _tokenService;
        public ProfileController(IUserService userService, IJwtTokenService tokenService)
        {
            _userService = userService;
            _tokenService = tokenService;
        }

        [HttpGet("ViewProfile")]
        public async Task<IActionResult> ViewProfile()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized("UserId claim missing");

            int userId = int.Parse(userIdClaim.Value);

            var profile = await _userService.GetProfileAsync(userId);



            return Ok(profile);
        }

        [HttpPut("UpdateProfile")]
        public async Task<IActionResult> UpdateProfile(UpdateProfileDTO dto)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized("UserId claim missing");

            int userId = int.Parse(userIdClaim.Value);


            await _userService.UpdateProfileAsync(userId, dto);

            return Ok(new { message = "Profile updated successfully" });
        }
    }
}
