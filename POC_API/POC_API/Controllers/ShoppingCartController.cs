using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using POC_API.DTO;
using POC_API.Service;

namespace POC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingCartController : ControllerBase
    {
        private readonly ShoppingCartService _shoppingCartService;

        public ShoppingCartController(ShoppingCartService shoppingCartService)
        {
            _shoppingCartService = shoppingCartService;
        }
        [HttpGet]
        public IActionResult GetAllShoppingCarts()
        {
            var result = _shoppingCartService.GetAll();
            return Ok(result);
        }
        [HttpGet("{id}")]
        public IActionResult GetShoppingCartById(int id)
        {
            var result = _shoppingCartService.GetById(id);
            return Ok(result);
        }
        [HttpPost]
        public IActionResult PostShoppingCart(PostShoppingCartDTO postShoppingCartDTO)
        {
            var result = _shoppingCartService.Create(postShoppingCartDTO);
            return Ok(result);
        }
        [HttpPut("{id}")]
        public IActionResult UpdateShoppingCart(int id, PostShoppingCartDTO updateShoppingCartDTO)
        {
            var result = _shoppingCartService.UpdateShoppingCart(id, updateShoppingCartDTO);
            return Ok(result);
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteShoppingCart(int id)
        {
            _shoppingCartService.DeleteById(id);
            return NoContent();
        }
    }
}
