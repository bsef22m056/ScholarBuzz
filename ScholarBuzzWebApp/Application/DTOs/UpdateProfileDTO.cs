using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class UpdateProfileDTO
    {
        // Basic Info
        public string FirstName { get; set; } = string.Empty;
        public string? LastName { get; set; }
        public string? PhoneNumber { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string Gender { get; set; } = string.Empty;

        // Location And Nationality
        public int? LocationId { get; set; }
        public List<int>? NationalityIds { get; set; }

        // Academic & Professional
        public List<EducationUpdateDTO>? Educations { get; set; }
        public List<ExperienceDTO>? Experiences { get; set; }
        public List<AchievementDTO>? Achievements { get; set; }
        public List<SkillDTO>? Skills { get; set; }
        
        // Interests (IDs only)
        public List<int>? InterestIds { get; set; }

        // Additional Info
        public FinancialInfoDTO? FinancialInfo { get; set; }
        public MedicalInfoDTO? MedicalInfo { get; set; }
    }

}
