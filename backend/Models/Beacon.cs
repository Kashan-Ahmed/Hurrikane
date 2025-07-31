using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Net;

namespace backend.Models
{
    [Table("Beacon")]
    public class Beacon
    {
        [Key]
        public int Id { get; set; } 

        [MaxLength(2)]
        public string? BeaconID { get; set; }

        public int PlantID { get; set; }

        public int MachNo { get; set; }

        [Column(TypeName = "inet")]
        public IPAddress? MachIP { get; set; }

        [MaxLength(2)]
        public string? Version { get; set; }

        public int Active { get; set; }

        [MaxLength(10)]
        public string? ShiftCode { get; set; }

        public int Event { get; set; }

        public int LifeTime { get; set; }

        public int Length { get; set; }

        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
    }
}