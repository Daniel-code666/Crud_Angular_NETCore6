using BackTarjeta.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BackTarjeta.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TarjetaController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public TarjetaController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<TarjetaController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listaTarjetas = _context.Tarjeta.ToList();
                
                return Ok(listaTarjetas);

            }catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // GET api/<TarjetaController>/5
        [HttpGet("{id}")]
        public ActionResult<Tarjeta> Get(int id)
        {
            try
            {
                var t = _context.Tarjeta.Where(x => x.Id == id).FirstOrDefault();

                if(t == null)
                {
                    return NotFound();
                }

                var tarjeta = new Tarjeta
                {
                    Id = t.Id,
                    Titular = t.Titular,
                    FechaExpiracion = t.FechaExpiracion,
                    CVV = t.CVV,
                    NumeroTarjeta = t.NumeroTarjeta
                };

                return tarjeta;

            }catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // POST api/<TarjetaController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Tarjeta tarjeta)
        {
            try
            {
                _context.Add(tarjeta);
                await _context.SaveChangesAsync();
                return Ok(tarjeta);

            }catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // PUT api/<TarjetaController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Tarjeta tarjeta)
        {
            try
            {
                if (id != tarjeta.Id)
                {
                    return NotFound();
                }

                _context.Update(tarjeta);
                await _context.SaveChangesAsync();

                return Ok(tarjeta);
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // DELETE api/<TarjetaController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var tarjeta = await _context.Tarjeta.FindAsync(id);

                if (tarjeta == null)
                {
                    return NotFound();
                }

                _context.Tarjeta.Remove(tarjeta);
                await _context.SaveChangesAsync();

                return NoContent();

            }catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }

        //comentario de prueba
    }
}
