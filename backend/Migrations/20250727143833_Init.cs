using System;
using System.Net;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Beacon",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BeaconID = table.Column<string>(type: "character varying(2)", maxLength: 2, nullable: true),
                    PlantID = table.Column<int>(type: "integer", nullable: false),
                    MachNo = table.Column<int>(type: "integer", nullable: false),
                    MachIP = table.Column<IPAddress>(type: "inet", nullable: true),
                    Version = table.Column<string>(type: "character varying(2)", maxLength: 2, nullable: true),
                    Active = table.Column<int>(type: "integer", nullable: false),
                    ShiftCode = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: true),
                    Event = table.Column<int>(type: "integer", nullable: false),
                    LifeTime = table.Column<int>(type: "integer", nullable: false),
                    Length = table.Column<int>(type: "integer", nullable: false),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Modified = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Beacon", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "statusBeacon",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    HexMachineStatus = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Efficiency = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    CurrentMachineRpm = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    CurrentPieceRevs = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    CurrentStopCount = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    YarnRate1 = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    YarnRate2 = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    YarnRate3 = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    YarnRate4 = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    YarnRate5 = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    YarnRate6 = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    YarnRate7 = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    DeclarationCode = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    DeclarationTimestamp = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    PieceNo = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Style = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    DefectLevelSetting = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    SensePotSetting = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    AmpPotSetting = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    ScannerOperation = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    DoffRevSetting = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    ElapsedTime = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    FirstTimeReset = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    OverrideStatus = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    CurrentHour = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    CurrentMinutes = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    CurrentMonth = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    CurrentDate = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    StopTime = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    FirmwareUpdateStatus = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    FirmwarePollEnable = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    BatteryStatus = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    OperatorType = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    OperatorCategory = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    OperatorId = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    OperatorPerformance = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Revolutions = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Modified = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_statusBeacon", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StopBeacon",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    StopKeyF = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    ShiftCode = table.Column<int>(type: "integer", nullable: false),
                    MachNo = table.Column<int>(type: "integer", nullable: false),
                    StopCount = table.Column<int>(type: "integer", nullable: false),
                    StopDate = table.Column<DateTime>(type: "date", nullable: false),
                    ShiftName = table.Column<string>(type: "character varying(5)", maxLength: 5, nullable: true),
                    StopStart = table.Column<TimeSpan>(type: "interval", nullable: false),
                    StopEnd = table.Column<TimeSpan>(type: "interval", nullable: false),
                    StopTime = table.Column<int>(type: "integer", nullable: false),
                    StopType = table.Column<string>(type: "character varying(2)", maxLength: 2, nullable: true),
                    Data = table.Column<string>(type: "jsonb", nullable: true),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Modified = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StopBeacon", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Beacon");

            migrationBuilder.DropTable(
                name: "statusBeacon");

            migrationBuilder.DropTable(
                name: "StopBeacon");
        }
    }
}
