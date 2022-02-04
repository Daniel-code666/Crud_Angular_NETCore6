using System.ComponentModel.DataAnnotations;

namespace BackTarjeta.Models
{
    public class Tarjeta
    {
        public int Id { get; set; }

        [Required]
        public string Titular { get; set; }

        [Required]
        public string NumeroTarjeta { get; set; }

        [Required]
        public string FechaExpiracion { get; set; }

        [Required]
        public string CVV { get; set; }
    }
}
