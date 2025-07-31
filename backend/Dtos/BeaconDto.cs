namespace backend.Dtos
{
    public class BeaconDto
    {
        public int Id { get; set; }
        public string? BeaconID { get; set; }
        public int PlantID { get; set; }
        public int MachNo { get; set; }
        public string? MachIP { get; set; }
        public string? Version { get; set; }
        public int Active { get; set; }
        public string? ShiftCode { get; set; }
        public int Event { get; set; }
        public int LifeTime { get; set; }
        public int Length { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
    }
}