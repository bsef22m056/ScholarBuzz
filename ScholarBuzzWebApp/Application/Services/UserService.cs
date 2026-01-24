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

        public UserService(IUserRepository userRepo, IRoleRepository roleRepo, IUserInterestRepository userInterestRepo)
        {
            _userRepo = userRepo;
            _roleRepo = roleRepo;
            _userInterestRepo = userInterestRepo;
        }

        // Authentication Related:-
        public async Task RegisterStudentAsync(User user, string password)
        {
            // 1. Check if email exists
            bool emailExists = await _userRepo.EmailExistsAsync(user.Email);
            if (emailExists)
                throw new Exception("This Email is already taken.");

            // 2. Validate password
            if (password.Length < 8 || !password.Any(char.IsDigit))
                throw new Exception("Password must be at least 8 characters and include a number.");

            // 3. Get Student role
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

                Educations = user.Educations?.Select(e => new EducationDTO
                {
                    DegreeLevel = e.DegreeLevel.Level,
                    Field = e.Field.Name,
                    Institute = e.Institute!.Name,
                    StartDate = e.StartDate,
                    EndDate = e.EndDate,
                    CGPA = e.CGPA,
                    Percentage = e.Percentage
                }).ToList(),

                Achievements = user.Achievements?.Select(a => new AchievementDTO
                {
                    Title = a.Title,
                    Description = a.Description,
                    DateRecieved = a.DateReceived
                }).ToList(),

                Interests = user.UserInterests?.Select(i => new InterestDTO
                {
                    Id = i.InterestId,
                    Name = i.Interest.Name
                }).ToList(),

                Skills = user.UserSkills?.Select(us => new SkillDTO
                {
                    Id = us.SkillTypeId,
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
                user.UserNationalities ??= new List<UserNationality>();
                user.UserNationalities.Clear();

                foreach (var nationalityId in dto.NationalityIds)
                {
                    user.UserNationalities.Add(new UserNationality
                    {
                        UserId = userId,
                        NationalityId = nationalityId
                    });
                }
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
                user.UserSkills ??= new List<UserSkill>();
                user.UserSkills.Clear();

                foreach (var skill in dto.Skills)
                {
                    user.UserSkills.Add(new UserSkill
                    {
                        UserId = userId,
                        SkillTypeId = skill.Id,
                        ProficiencyLevel = skill.ProficiencyLevel
                    });
                }
            }

            // ================= INTERESTS =================
            if (dto.InterestIds != null)
            {
                user.UserInterests ??= new List<UserInterest>();
                user.UserInterests.Clear();

                foreach (var interestId in dto.InterestIds)
                {
                    user.UserInterests.Add(new UserInterest
                    {
                        UserId = userId,
                        InterestId = interestId
                    });
                }
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
                        DateReceived = ach.DateRecieved
                    });
                }
            }

            await _userRepo.UpdateUserAsync(user);
        }

        // User Interests Related:-
        public async Task UpdateUserInterestsAsync(int userId, List<int>? interestIds)
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
                    InterestId = id,
                    IsPending = false
                })
                .ToList();

            _userInterestRepo.RemoveRange(toRemove);
            await _userInterestRepo.AddRangeAsync(toAdd);
        }
    }
}