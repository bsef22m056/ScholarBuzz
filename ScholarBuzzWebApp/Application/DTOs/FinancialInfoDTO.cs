using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class FinancialInfoDTO
    {
        public string? EmploymentStatus { get; set; } // Student, Part - time, Unemployed, etc.
        public int? DependentCount { get; set; }
        public string? FundingSource { get; set; } // Self, Sponsored, Govt Aid etc.
        public decimal? AnnualFamilyIncome { get; set; }
    }
}
