using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class EducationUpdateDTO
    {
        public int DegreeLevelId { get; set; }
        public int InstituteId { get; set; }
        public int FieldId { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public double CGPA { get; set; }
        public double Percentage { get; set; }
        public double Scale { get; set; }
        public string? HonorsAward { get; set; }
    }
}
