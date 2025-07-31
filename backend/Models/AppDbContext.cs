using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // public DbSet<User> Users { get; set; }
        public DbSet<Beacon> Beacons { get; set; }
        public DbSet<StatusBeacon> StatusBeacons { get; set; }
        public DbSet<StopBeacon> StopBeacons { get; set; }
    }
}
