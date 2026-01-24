using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CorrectedinterestIdinjointable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserInterests_Interests_InterestsId",
                table: "UserInterests");

            migrationBuilder.DropIndex(
                name: "IX_UserInterests_InterestsId",
                table: "UserInterests");

            migrationBuilder.DropColumn(
                name: "InterestsId",
                table: "UserInterests");

            migrationBuilder.AddForeignKey(
                name: "FK_UserInterests_Interests_InterestId",
                table: "UserInterests",
                column: "InterestId",
                principalTable: "Interests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserInterests_Interests_InterestId",
                table: "UserInterests");

            migrationBuilder.AddColumn<int>(
                name: "InterestsId",
                table: "UserInterests",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_UserInterests_InterestsId",
                table: "UserInterests",
                column: "InterestsId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserInterests_Interests_InterestsId",
                table: "UserInterests",
                column: "InterestsId",
                principalTable: "Interests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
