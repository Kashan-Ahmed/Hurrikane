using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    [Table("statusBeacon")]
    public class StatusBeacon
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(50)] public string? HexMachineStatus { get; set; }
        [MaxLength(50)] public string? Efficiency { get; set; }
        [MaxLength(50)] public string? CurrentMachineRpm { get; set; }
        [MaxLength(50)] public string? CurrentPieceRevs { get; set; }
        [MaxLength(50)] public string? CurrentStopCount { get; set; }
        [MaxLength(50)] public string? YarnRate1 { get; set; }
        [MaxLength(50)] public string? YarnRate2 { get; set; }
        [MaxLength(50)] public string? YarnRate3 { get; set; }
        [MaxLength(50)] public string? YarnRate4 { get; set; }
        [MaxLength(50)] public string? YarnRate5 { get; set; }
        [MaxLength(50)] public string? YarnRate6 { get; set; }
        [MaxLength(50)] public string? YarnRate7 { get; set; }
        [MaxLength(50)] public string? DeclarationCode { get; set; }
        [MaxLength(50)] public string? DeclarationTimestamp { get; set; }
        [MaxLength(50)] public string? PieceNo { get; set; }
        [MaxLength(50)] public string? Style { get; set; }
        [MaxLength(50)] public string? DefectLevelSetting { get; set; }
        [MaxLength(50)] public string? SensePotSetting { get; set; }
        [MaxLength(50)] public string? AmpPotSetting { get; set; }
        [MaxLength(50)] public string? ScannerOperation { get; set; }
        [MaxLength(50)] public string? DoffRevSetting { get; set; }
        [MaxLength(50)] public string? ElapsedTime { get; set; }
        [MaxLength(50)] public string? FirstTimeReset { get; set; }
        [MaxLength(50)] public string? OverrideStatus { get; set; }
        [MaxLength(50)] public string? CurrentHour { get; set; }
        [MaxLength(50)] public string? CurrentMinutes { get; set; }
        [MaxLength(50)] public string? CurrentMonth { get; set; }
        [MaxLength(50)] public string? CurrentDate { get; set; }
        [MaxLength(50)] public string? StopTime { get; set; }
        [MaxLength(50)] public string? FirmwareUpdateStatus { get; set; }
        [MaxLength(50)] public string? FirmwarePollEnable { get; set; }
        [MaxLength(50)] public string? BatteryStatus { get; set; }
        [MaxLength(50)] public string? OperatorType { get; set; }
        [MaxLength(50)] public string? OperatorCategory { get; set; }
        [MaxLength(50)] public string? OperatorId { get; set; }
        [MaxLength(50)] public string? OperatorPerformance { get; set; }
        [MaxLength(50)] public string? Revolutions { get; set; }

        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
    }
}