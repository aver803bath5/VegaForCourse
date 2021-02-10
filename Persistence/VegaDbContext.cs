using Microsoft.EntityFrameworkCore;
using VegaForCourse.Configuration;
using VegaForCourse.Models;

namespace VegaForCourse.Persistence
{
    public class VegaDbContext : DbContext
    {
        public DbSet<Make> Makes { get; set; }
        public DbSet<Feature> Features { get; set; }
        public DbSet<Model> Models { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<VehicleFeature> VehicleFeatures { get; set; }

        public VegaDbContext(DbContextOptions<VegaDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new VehicleFeatureConfiguration());

            modelBuilder.Entity<Vehicle>(vb =>
            {
                vb.OwnsOne(v => v.Contact,
                    ob =>
                    {
                        ob.Property(c => c.Email)
                            .HasMaxLength(255)
                            .HasColumnName("ContactEmail");
                        ob.Property(c => c.Name)
                            .IsRequired()
                            .HasMaxLength(255)
                            .HasColumnName("ContactName");
                        ob.Property(c => c.Phone)
                            .IsRequired()
                            .HasMaxLength(255)
                            .HasColumnName("ContactPhone");
                    });

                vb.Navigation(v => v.Contact).IsRequired();
            });
        }
    }
}