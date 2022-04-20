using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using POC_API.DTO;
using POC_API.Service;

namespace POC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly CustomerService _customerService;

        public CustomerController(CustomerService customerService)
        {
            _customerService = customerService;
        }
        [HttpGet]
        public IActionResult GetAllCustomers()
        {
            var result = _customerService.GetAll();
            return Ok(result);
        }
        [HttpGet("{id}")]
        public IActionResult GetCustomerById(int id)
        {
            var result = _customerService.GetById(id);
            return Ok(result);
        }
        [HttpPost]
        public IActionResult PostCustomer(PostCustomerDTO postCustomerDTO)
        {
            var result = _customerService.Create(postCustomerDTO);
            return Ok(result);
        }
        [HttpPut("{id}")]
        public IActionResult UpdateCustomer(int id, PostCustomerDTO updateCustomerDTO)
        {
            var result = _customerService.UpdateCustomer(id, updateCustomerDTO);
            return Ok(result);
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteCart(int id)
        {
            _customerService.DeleteById(id);
            return NoContent();
        }
    }
}
