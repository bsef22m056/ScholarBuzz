using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class MedicalInfoDTO
    {
        public string? HealthNotes { get; set; }
        public bool DisabilityStatus { get; set; }
        public string DisabilityDetails { get; set; } = string.Empty;
    }
}
