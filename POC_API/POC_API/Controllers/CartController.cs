using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using POC_API.DTO;
using POC_API.Service;

namespace POC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly CartService _cartService;

        public CartController(CartService cartService)
        {
            _cartService = cartService;
        }
        [HttpGet]
        public IActionResult GetAllCarts()
        {
            var result = _cartService.GetAll();
            return Ok(result);
        }
        [HttpGet("{id}")]
        public IActionResult GetCartById(int id)
        {
            var result = _cartService.GetById(id);
            return Ok(result);
        }
        [HttpPost]
        public IActionResult PostCart(PostCartDTO postCartDTO)
        {
            var result = _cartService.Create(postCartDTO);
            return Ok(result);
        }
        [HttpPut("{id}")]
        public IActionResult UpdateCart(int id, PostCartDTO updateCartDTO)
        {
            var result = _cartService.UpdateCart(id, updateCartDTO);
            return Ok(result);
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteCart(int id)
        {
            _cartService.DeleteById(id);
            return NoContent();
        }
    }
}
