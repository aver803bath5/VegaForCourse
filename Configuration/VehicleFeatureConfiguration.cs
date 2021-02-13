using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VegaForCourse.Core.Models;

namespace VegaForCourse.Configuration
{
    public class VehicleFeatureConfiguration : IEntityTypeConfiguration<VehicleFeature>
    {
        public void Configure(EntityTypeBuilder<VehicleFeature> builder)
        {
            builder.ToTable("VehicleFeatures");
            builder.HasKey(vf => new {vf.FeatureId, vf.VehicleId});

            builder
                .HasOne(vf => vf.Feature)
                .WithMany(f => f.Vehicles)
                .HasForeignKey(vf => vf.FeatureId);

            builder
                .HasOne(vf => vf.Vehicle)
                .WithMany(f => f.Features)
                .HasForeignKey(vf => vf.VehicleId);
        }
    }
}