using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("StopBeacon")]
    public class StopBeacon
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(255)]
        public string? StopKeyF { get; set; }

        public int ShiftCode { get; set; }

        public int MachNo { get; set; }

        public int StopCount { get; set; }

        [Column(TypeName = "date")]
        public DateTime StopDate { get; set; }

        [MaxLength(5)]
        public string? ShiftName { get; set; }

        public TimeSpan StopStart { get; set; }

        public TimeSpan StopEnd { get; set; }

        public int StopTime { get; set; }

        [MaxLength(2)]
        public string? StopType { get; set; }

        [Column(TypeName = "jsonb")]
        public string? Data { get; set; }

        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
    }
}