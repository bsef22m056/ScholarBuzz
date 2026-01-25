using Domain.Entities.Joins;
using Domain.Entities.Locations;
using Domain.Entities.UserProfile;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Users
{
    public class User
    {
        public int Id { get; set; } // -
        
        // Navigation Properties:-
        public int RoleId { get; set; } // FK -
        public Role? Role { get; set; } // For Role -

        public int? LocationId { get; set; } // FK
        public Location? Location { get; set; } // For Location

        public FinancialInfo? FinancialInfo { get; set; } // For FinancialInfo
        public MedicalInfo? MedicalInfo { get; set; } // For MedicalInfo
        public List<Achievement> Achievements { get; set; } // For Achievements
        public List<Experience> Experiences { get; set; } // For Experiences
        public List<Education> Educations { get; set; } // For Educations

        // Join Table Navigation Properties:-
        public List<UserNationality> UserNationalities { get; set; } // For UserNationality
        public List<UserInterest> UserInterests { get; set; }  // For UserInterest
        public List<UserSkill> UserSkills { get; set; }  // For UserSkill

        public string FirstName { get; set; } = string.Empty;
        public string? LastName { get; set; }
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
        public DateOnly DateOfBirth { get; set; } 
        public string Gender { get; set; } = string.Empty; 

        public DateTime UpdatedAt { get; set; } 
        public DateTime CreatedAt { get; set; } 
        
        public int FailedLoginAttempts { get; set; } // For Lockout check
        public DateTime? LockoutEndTime { get; set; } // For Lockout check
        public bool IsLockedOut { get; set; } // For Lockout check
        public bool IsDeleted { get; set; } // For Soft Deletion
        public DateTime? DeletedAt { get; set; } // For Soft Deletion
        public string? PasswordResetToken { get; set; } // For Forgot Password
        public DateTime? PasswordResetTokenExpiry { get; set; } // For Forgot Password
    }
}
