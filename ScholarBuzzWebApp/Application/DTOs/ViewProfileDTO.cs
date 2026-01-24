using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class ViewProfileDTO
    {
        // Basic Info
        public int UserId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string? LastName { get; set; }
        public string Email { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string Gender { get; set; } = string.Empty;

        // Location
        public LocationDTO? Location { get; set; }

        // Academic & Professional
        public List<EducationDTO>? Educations { get; set; } = new();
        public List<ExperienceDTO>? Experiences { get; set; } = new();
        public List<AchievementDTO>? Achievements { get; set; } = new();
        public List<SkillDTO>? Skills { get; set; } = new();
        public List<InterestDTO>? Interests { get; set; } = new();

        // Additional Info
        public FinancialInfoDTO? FinancialInfo { get; set; }
        public MedicalInfoDTO? MedicalInfo { get; set; }

        // Nationalities
        public List<NationalityDTO>? Nationalities { get; set; } = new();
    }

}
