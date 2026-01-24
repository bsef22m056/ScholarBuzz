using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class EducationDTO
    {
        public int Id { get; set; }
        public string DegreeLevel { get; set; } = string.Empty;
        public string Field { get; set; } = string.Empty;
        public string Institute { get; set; } = string.Empty;
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public double? CGPA { get; set; }
        public double? Percentage { get; set; }
        public double? Scale { get; set; }
        public string? HonorsAward { get; set; }
    }

}
