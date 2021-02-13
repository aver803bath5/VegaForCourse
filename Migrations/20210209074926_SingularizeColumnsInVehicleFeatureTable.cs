using Microsoft.EntityFrameworkCore.Migrations;

namespace VegaForCourse.Migrations
{
    public partial class SingularizeColumnsInVehicleFeatureTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VehicleFeatures_Features_FeaturesId",
                table: "VehicleFeatures");

            migrationBuilder.DropForeignKey(
                name: "FK_VehicleFeatures_Vehicles_VehiclesId",
                table: "VehicleFeatures");

            migrationBuilder.RenameColumn(
                name: "VehiclesId",
                table: "VehicleFeatures",
                newName: "VehicleId");

            migrationBuilder.RenameColumn(
                name: "FeaturesId",
                table: "VehicleFeatures",
                newName: "FeatureId");

            migrationBuilder.RenameIndex(
                name: "IX_VehicleFeatures_VehiclesId",
                table: "VehicleFeatures",
                newName: "IX_VehicleFeatures_VehicleId");

            migrationBuilder.AddForeignKey(
                name: "FK_VehicleFeatures_Features_FeatureId",
                table: "VehicleFeatures",
                column: "FeatureId",
                principalTable: "Features",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_VehicleFeatures_Vehicles_VehicleId",
                table: "VehicleFeatures",
                column: "VehicleId",
                principalTable: "Vehicles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VehicleFeatures_Features_FeatureId",
                table: "VehicleFeatures");

            migrationBuilder.DropForeignKey(
                name: "FK_VehicleFeatures_Vehicles_VehicleId",
                table: "VehicleFeatures");

            migrationBuilder.RenameColumn(
                name: "VehicleId",
                table: "VehicleFeatures",
                newName: "VehiclesId");

            migrationBuilder.RenameColumn(
                name: "FeatureId",
                table: "VehicleFeatures",
                newName: "FeaturesId");

            migrationBuilder.RenameIndex(
                name: "IX_VehicleFeatures_VehicleId",
                table: "VehicleFeatures",
                newName: "IX_VehicleFeatures_VehiclesId");

            migrationBuilder.AddForeignKey(
                name: "FK_VehicleFeatures_Features_FeaturesId",
                table: "VehicleFeatures",
                column: "FeaturesId",
                principalTable: "Features",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_VehicleFeatures_Vehicles_VehiclesId",
                table: "VehicleFeatures",
                column: "VehiclesId",
                principalTable: "Vehicles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
