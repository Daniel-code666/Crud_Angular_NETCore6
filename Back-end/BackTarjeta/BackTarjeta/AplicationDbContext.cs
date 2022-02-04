using BackTarjeta.Models;
using Microsoft.EntityFrameworkCore;

namespace BackTarjeta
{
    public class AplicationDbContext : DbContext
    {
        public DbSet<Tarjeta> Tarjeta { get; set; }

        public AplicationDbContext(DbContextOptions<AplicationDbContext> options): base(options)
        {

        }
    }
}
