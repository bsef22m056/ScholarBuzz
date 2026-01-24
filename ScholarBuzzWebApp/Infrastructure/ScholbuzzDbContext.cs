using Domain.Entities.Joins;
using Domain.Entities.Locations;
using Domain.Entities.UserProfile;
using Domain.Entities.Users;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure
{
    public class ScholbuzzDbContext :  DbContext
    {
        public ScholbuzzDbContext(DbContextOptions<ScholbuzzDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasOne(u => u.Location)
                .WithMany()
                .HasForeignKey(u => u.LocationId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<FinancialInfo>()
                .Property(f => f.AnnualFamilyIncome)
                .HasPrecision(18, 2);

            modelBuilder.Entity<UserInterest>()
                .HasIndex(ui => ui.InterestId);


            modelBuilder.Entity<UserInterest>()
                .HasKey(ui => new { ui.UserId, ui.InterestId });

            modelBuilder.Entity<UserSkill>()
                .HasKey(us => new { us.UserId, us.SkillTypeId });

            modelBuilder.Entity<UserNationality>()
                .HasKey(un => new { un.UserId, un.NationalityId });
        }


        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Nationality> Nationalities { get; set; }

        public DbSet<FinancialInfo> FinancialInfos { get; set; }
        public DbSet<MedicalInfo> MedicalInfos { get; set; }
        public DbSet<Education> Educations { get; set; }
        public DbSet<Experience> Experiences { get; set; }
        public DbSet<Achievement> Achievements { get; set; }

        public DbSet<SkillType> Skills { get; set; }
        public DbSet<InterestType> Interests { get; set; }
        public DbSet<DegreeLevel> DegreeLevels { get; set; }
        public DbSet<Field> Fields { get; set; }
        public DbSet<Institute> Institutes { get; set; }

        public DbSet<UserSkill> UserSkills { get; set; }
        public DbSet<UserInterest> UserInterests { get; set; }
        public DbSet<UserNationality> UserNationalities { get; set; }

    }
}
