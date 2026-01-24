using Domain.Entities.UserProfile;
using Domain.Entities.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.UserProfile
{
    public class FinancialInfo
    {
        public int Id { get; set; }

        public int UserId { get; set; } // FK
        public User? User { get; set; } // Navigation Property for User

        public string? EmploymentStatus { get; set; } // Student, Part - time, Unemployed, etc.
        public int? DependentCount { get; set; }
        public string? FundingSource  { get; set; } // Self, Sponsored, Govt Aid etc.
        public decimal? AnnualFamilyIncome { get; set; }
    }
}