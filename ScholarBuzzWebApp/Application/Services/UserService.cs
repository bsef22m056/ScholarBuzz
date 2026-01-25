using Application.DTOs;
using Application.Interfaces;
using Domain.Entities.Joins;
using Domain.Entities.UserProfile;
using Domain.Entities.Users;
using Domain.Interfaces;
using Isopoh.Cryptography.Argon2;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepo;
        private readonly IRoleRepository _roleRepo;
        private readonly IUserInterestRepository _userInterestRepo;
        private readonly IUserNationalityRepository _userNationalityRepo;
        private readonly IUserSkillRepository _userSkillRepo;
        private readonly IEmailService _emailService;
        public UserService(IUserRepository userRepo, IRoleRepository roleRepo, IUserInterestRepository userInterestRepo, IUserNationalityRepository userNationalityRepo, IUserSkillRepository userSkillRepo, IEmailService emailService)
        {
            _userRepo = userRepo;
            _roleRepo = roleRepo;
            _userInterestRepo = userInterestRepo;
            _userNationalityRepo = userNationalityRepo;
            _userSkillRepo = userSkillRepo;
            _emailService = emailService;
        }

        // Authentication Related:-
        public async Task ChangePasswordAsync(int userId, ChangePasswordDTO dto)
        {
            var user = await _userRepo.GetUserByIdAsync(userId);

            if (user == null)
                throw new Exception("User not found");

            // Verify current password
            bool isValid = Argon2.Verify(user.PasswordHash, dto.CurrentPassword);
            if (!isValid)
                throw new Exception("Current password is incorrect");

            // Hash new password
            user.PasswordHash = Argon2.Hash(dto.NewPassword);
            user.UpdatedAt = DateTime.UtcNow;

            await _userRepo.UpdateUserAsync(user);
        }
        public async Task RegisterStudentAsync(User user, string password)
        {
            // Check if email exists
            bool emailExists = await _userRepo.EmailExistsAsync(user.Email);
            if (emailExists)
                throw new Exception("This Email is already taken.");

            // Validate password
            if (password.Length < 8 || !password.Any(char.IsDigit))
                throw new Exception("Password must be at least 8 characters and include a number.");

            // Get Student role
            var studentRole = await _roleRepo.GetRoleByIdAsync(2);

            // 4. Initialize remaiining user fields
            user.PasswordHash = Argon2.Hash(password); // hashing
            
            user.RoleId = studentRole.Id;
            user.Role = null;
            
            user.CreatedAt = DateTime.UtcNow;
            user.UpdatedAt = DateTime.UtcNow;
            
            user.FailedLoginAttempts = 0;
            user.IsLockedOut = false;

            user.IsDeleted = false;

            // 5. Save to DB
            await _userRepo.AddUserAsync(user);
        }
        public async Task<User> LoginAsync(string email, string password)
        {
            var user = await _userRepo.GetUserByEmailAsync(email);

            if (user == null)
                throw new Exception("Invalid email or password");

            if (user.IsLockedOut && user.LockoutEndTime > DateTime.UtcNow)
                throw new Exception("Account locked. Try again later.");

            if (user.IsDeleted)
            {
                throw new Exception("Your account has been Deleted!");
            }

            bool isPasswordCorrect = Argon2.Verify(user.PasswordHash, password);

            if (!isPasswordCorrect)
            {
                user.FailedLoginAttempts++;

                if (user.FailedLoginAttempts >= 5)
                {
                    user.IsLockedOut = true;
                    user.LockoutEndTime = DateTime.UtcNow.AddMinutes(10);
                }
                
                await _userRepo.UpdateUserAsync(user);
                throw new Exception("Invalid email or password");
            }

            // Successful login
            user.FailedLoginAttempts = 0;
            user.IsLockedOut = false;
            user.LockoutEndTime = null;

            await _userRepo.UpdateUserAsync(user);
            return user;
        }

        // Profile Related:-
        public async Task<ViewProfileDTO> GetProfileAsync(int userId)
        {
            var user = await _userRepo.GetUserWithProfileAsync(userId);

            if (user == null)
            {
                throw new Exception("User not found");
            }

            return new ViewProfileDTO
            {
                UserId = userId,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                DateOfBirth = user.DateOfBirth,
                Gender = user.Gender,

                Location = user.Location == null ? null : new LocationDTO
                {
                    Id = user.Location.Id,
                    Name = user.Location.Name,
                    Type = (int)user.Location.Type
                },

                Experiences = user.Experiences?.Select(ex => new ExperienceDTO
                {
                    Organization = ex.Organization,
                    Designation = ex.Designation,
                    Description = ex.Description,
                    StartDate = ex.StartDate,
                    EndDate = ex.EndDate
                }).ToList(),

                Educations = user.Educations?.Select(e => new EducationDTO
                {
                    DegreeLevel = e.DegreeLevel.Level,
                    Field = e.Field.Name,
                    Institute = e.Institute!.Name,
                    StartDate = e.StartDate,
                    EndDate = e.EndDate,
                    CGPA = e.CGPA,
                    Percentage = e.Percentage,
                    Scale = e.Scale,
                    HonorsAward = e.HonorsAward
                }).ToList(),

                Achievements = user.Achievements?.Select(a => new AchievementDTO
                {
                    Title = a.Title,
                    Description = a.Description,
                    DateReceived = a.DateReceived
                }).ToList(),

                Interests = user.UserInterests?.Select(i => new InterestDTO
                {
                    Name = i.Interest.Name
                }).ToList(),

                Skills = user.UserSkills?.Select(us => new SkillDTO
                {
                    Name = us.SkillType.Name,
                    ProficiencyLevel = us.ProficiencyLevel
                }).ToList(),

                FinancialInfo = new FinancialInfoDTO
                {
                    AnnualFamilyIncome = user.FinancialInfo?.AnnualFamilyIncome,
                    DependentCount = user.FinancialInfo?.DependentCount,
                    EmploymentStatus = user.FinancialInfo?.EmploymentStatus,
                    FundingSource = user.FinancialInfo?.FundingSource
                },

                MedicalInfo = user.MedicalInfo == null ? null : new MedicalInfoDTO
                {
                    DisabilityStatus = user.MedicalInfo.DisabilityStatus,
                    DisabilityDetails = user.MedicalInfo.DisabilityDetails,
                    HealthNotes = user.MedicalInfo.HealthNotes
                },

                Nationalities = user.UserNationalities.Select(n => new NationalityDTO
                {
                    Name = n.Nationality.Name
                }).ToList()
            };
        }

        public async Task UpdateProfileAsync(int userId, UpdateProfileDTO dto)
        {
            var user = await _userRepo.GetUserWithProfileAsync(userId);

            if (user == null)
                throw new Exception("User not found");

            // ================= BASIC INFO =================
            user.FirstName = dto.FirstName;
            user.LastName = dto.LastName;
            user.PhoneNumber = dto.PhoneNumber;
            user.DateOfBirth = dto.DateOfBirth;
            user.Gender = dto.Gender;
            user.UpdatedAt = DateTime.UtcNow;

            // ================= LOCATION =================
            if (dto.LocationId.HasValue && dto.LocationId != user.LocationId)
            {
                user.LocationId = dto.LocationId.Value;
            }

            // ================= NATIONALITY =================
            if (dto.NationalityIds != null)
            {
                await UpdateUserNationalitiesAsync(userId, dto.NationalityIds);
            }

            // ================= FINANCIAL INFO =================
            if (dto.FinancialInfo != null)
            {
                if (user.FinancialInfo == null)
                {
                    user.FinancialInfo = new FinancialInfo
                    {
                        UserId = user.Id
                    };
                }

                user.FinancialInfo.AnnualFamilyIncome = dto.FinancialInfo.AnnualFamilyIncome;
                user.FinancialInfo.DependentCount = dto.FinancialInfo.DependentCount;
                user.FinancialInfo.EmploymentStatus = dto.FinancialInfo.EmploymentStatus;
                user.FinancialInfo.FundingSource = dto.FinancialInfo.FundingSource;
            }

            // ================= MEDICAL INFO =================
            if (dto.MedicalInfo != null)
            {
                if (user.MedicalInfo == null)
                {
                    user.MedicalInfo = new MedicalInfo
                    {
                        UserID = user.Id
                    };
                }

                user.MedicalInfo.DisabilityStatus = dto.MedicalInfo.DisabilityStatus;
                user.MedicalInfo.DisabilityDetails = dto.MedicalInfo.DisabilityDetails;
                user.MedicalInfo.HealthNotes = dto.MedicalInfo.HealthNotes;
            }

            // ================= SKILLS =================
            if (dto.Skills != null)
            {
                await UpdateUserSkillsAsync(userId, dto.Skills);
            }


            // ================= INTERESTS =================
            if (dto.InterestIds != null)
            {
                await UpdateUserInterestsAsync(userId, dto.InterestIds);
            }

            // ================= EDUCATION =================
            if (dto.Educations != null)
            {
                user.Educations ??= new List<Education>();
                user.Educations.Clear();

                foreach (var edu in dto.Educations)
                {
                    user.Educations.Add(new Education
                    {
                        UserId = userId,
                        DegreeLevelId = edu.DegreeLevelId,
                        InstituteId = edu.InstituteId,
                        FieldId = edu.FieldId,
                        StartDate = edu.StartDate,
                        EndDate = edu.EndDate,
                        CGPA = edu.CGPA,
                        Percentage = edu.Percentage,
                        Scale = edu.Scale,
                        HonorsAward = edu.HonorsAward
                    });
                }
            }

            // ================= EXPERIENCE =================
            if (dto.Experiences != null)
            {
                user.Experiences ??= new List<Experience>();
                user.Experiences.Clear();

                foreach (var exp in dto.Experiences)
                {
                    user.Experiences.Add(new Experience
                    {
                        UserId = userId,
                        Designation = exp.Designation,
                        Organization = exp.Organization,
                        StartDate = exp.StartDate,
                        EndDate = exp.EndDate,
                        Description = exp.Description
                    });
                }
            }

            // ================= ACHIEVEMENTS =================
            if (dto.Achievements != null)
            {
                user.Achievements ??= new List<Achievement>();
                user.Achievements.Clear();

                foreach (var ach in dto.Achievements)
                {
                    user.Achievements.Add(new Achievement
                    {
                        UserId = userId,
                        Title = ach.Title,
                        Description = ach.Description,
                        DateReceived = ach.DateReceived
                    });
                }
            }

            await _userRepo.UpdateUserAsync(user);
        }

        // User Interests Related:-
        private async Task UpdateUserInterestsAsync(int userId, List<int>? interestIds)
        {
            if (interestIds == null)
                return;

            var existing = await _userInterestRepo.GetByUserIdAsync(userId);

            var existingIds = existing.Select(e => e.InterestId).ToHashSet();

            var toRemove = existing
                .Where(e => !interestIds.Contains(e.InterestId))
                .ToList();

            var toAdd = interestIds
                .Where(id => !existingIds.Contains(id))
                .Select(id => new UserInterest
                {
                    UserId = userId,
                    InterestId = id
                })
                .ToList();

            _userInterestRepo.RemoveRange(toRemove);
            await _userInterestRepo.AddRangeAsync(toAdd);
        }

        // User Nationalities Related:-
        private async Task UpdateUserNationalitiesAsync(int userId, List<int> nationalityIds)
        {
            var existing = await _userNationalityRepo.GetByUserIdAsync(userId);

            var existingIds = existing.Select(x => x.NationalityId).ToHashSet();

            var toRemove = existing
                .Where(x => !nationalityIds.Contains(x.NationalityId))
                .ToList();

            var toAdd = nationalityIds
                .Where(id => !existingIds.Contains(id))
                .Select(id => new UserNationality
                {
                    UserId = userId,
                    NationalityId = id
                })
                .ToList();

            if (toRemove.Any())
                await _userNationalityRepo.RemoveRangeAsync(toRemove);

            if (toAdd.Any())
                await _userNationalityRepo.AddRangeAsync(toAdd);
        }

        // User Skills Related
        private async Task UpdateUserSkillsAsync(int userId, List<SkillDTO> skills)
        {
            var existing = await _userSkillRepo.GetByUserIdAsync(userId);

            var incomingDict = skills.ToDictionary(x => x.Id);

            // Remove skills not present anymore
            var toRemove = existing
                .Where(x => !incomingDict.ContainsKey(x.SkillTypeId))
                .ToList();

            // Update existing skills
            foreach (var skill in existing)
            {
                if (incomingDict.TryGetValue(skill.SkillTypeId, out var dto))
                {
                    skill.ProficiencyLevel = dto.ProficiencyLevel;
                }
            }

            // Add new skills
            var existingIds = existing.Select(x => x.SkillTypeId).ToHashSet();

            var toAdd = skills
                .Where(x => !existingIds.Contains(x.Id))
                .Select(x => new UserSkill
                {
                    UserId = userId,
                    SkillTypeId = x.Id,
                    ProficiencyLevel = x.ProficiencyLevel
                })
                .ToList();

            if (toRemove.Any())
                await _userSkillRepo.RemoveRangeAsync(toRemove);

            if (toAdd.Any())
                await _userSkillRepo.AddRangeAsync(toAdd);
        }

        public async Task ForgotPasswordAsync(ForgotPasswordDTO dto)
        {
            var user = await _userRepo.GetUserByEmailAsync(dto.Email);

            // Do NOT reveal if email exists
            if (user == null)
                return;

            var token = Guid.NewGuid().ToString("N");

            user.PasswordResetToken = token;
            user.PasswordResetTokenExpiry = DateTime.UtcNow.AddMinutes(30);

            await _userRepo.UpdateUserAsync(user);

            var resetLink = $"https://frontend-app.com/reset-password?token={token}";
            var emailBody = $@"
                    <p>Hello {user.FirstName},</p>
                    <p>You requested to reset your password.</p> </br>
                    <p>
                        <a href='{resetLink}'>Click here to reset your password</a>
                    </p> </br>
                    <p>This link will expire in 30 minutes.</p> </br>
                    <p>If you did not request this, please ignore this email.</p>";

            await _emailService.SendAsync(user.Email, "Reset Your Password", emailBody);

        }

        // ================= RESET PASSWORD =================
        public async Task ResetPasswordAsync(ResetPasswordDTO dto)
        {
            var user = await _userRepo.GetByResetTokenAsync(dto.Token);

            if (user == null)
                throw new Exception("Invalid or expired reset token");

            user.PasswordHash = Argon2.Hash(dto.NewPassword);
            user.PasswordResetToken = null;
            user.PasswordResetTokenExpiry = null;

            await _userRepo.UpdateUserAsync(user);
        }

        // ================= Delete Account =================
        public async Task DeleteAccountAsync(int userId, string password)
        {
            var user = await _userRepo.GetUserByIdAsync(userId);

            if (user == null || user.IsDeleted)
                throw new Exception("User not found");

            // Verify password
            var isValid = Argon2.Verify(user.PasswordHash, password);

            if (!isValid)
                throw new Exception("Invalid password");

            await _userRepo.DeleteUserAsync(userId);
        }

    }
}