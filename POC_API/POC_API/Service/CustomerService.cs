using POC_API.DTO;
using POC_API.Model;
using POC_API.Repository;

namespace POC_API.Service
{
    public class CustomerService
    {
        private readonly CustomerRepository _repo;
        public CustomerService(CustomerRepository repo)
        {
            _repo = repo;
        }
        public List<Customer> GetAll()
        {
            var result = _repo.GetAll();
            var list = new List<Customer>();
            foreach (var item in result)
            {
                list.Add(new Customer()
                {
                    Id = item.Id,
                    Name = item.Name,
                    Address = item.Address,
                    Owner = item.Owner,
                    PhoneNumber = item.PhoneNumber,
                });
            }
            return list;
        }
        public Customer GetById(int id)
        {
            var result = _repo.GetById(id);
            if (result == null)
            {
                throw new Exception("Incorrect ID");
            }
            return new Customer()
            {
                Id = result.Id,
                Name = result.Name,
                Address = result.Address,
                Owner = result.Owner,
                PhoneNumber = result.PhoneNumber,
            };
        }
        public Customer Create(PostCustomerDTO postCustomerDTO)
        {
            var result = _repo.Create(new PostCustomerDTO()
            {
                Name = postCustomerDTO.Name,
                Address = postCustomerDTO.Address,
                Owner = postCustomerDTO.Owner,
                PhoneNumber = postCustomerDTO.PhoneNumber,
            });
            return new Customer()
            {
                Name = result.Name,
                Address = result.Address,
                Owner = postCustomerDTO.Owner,
                PhoneNumber = postCustomerDTO.PhoneNumber,
            };
        }
        public void DeleteById(int id)
        {
            var result = _repo.GetById(id);
            if (result == null)
            {
                throw new Exception("Entity not found");
            }
            _repo.DeleteById(result);
        }
        public Customer UpdateCustomer(int id, PostCustomerDTO updateCustomerDTO)
        {
            var customer = _repo.GetById(id);
            if (customer == null)
            {
                throw new Exception("ID was not found");
            }
            customer.Id = id;
            customer.Name = updateCustomerDTO.Name;
            customer.Address = updateCustomerDTO.Address;
            customer.Owner = updateCustomerDTO.Owner;
            customer.PhoneNumber = updateCustomerDTO.PhoneNumber;
            _repo.Update(customer);
            return customer;
        }
    }
}
