using POC_API.Data;
using POC_API.DTO;
using POC_API.Model;

namespace POC_API.Repository
{
    public class CustomerRepository
    {
        private readonly DataContext context;

        public CustomerRepository(DataContext context)
        {
            this.context = context;
        }
        public List<Customer> GetAll()
        {
            return context.Customers.ToList();
        }
        public Customer GetById(int id)
        {
            var result = context.Customers.Find(id);
            return result;
        }
        public Customer Create(PostCustomerDTO postCustomerDTO)
        {
            Customer customer = new Customer()
            {
                Name = postCustomerDTO.Name,
                Address = postCustomerDTO.Address,
                Owner = postCustomerDTO.Owner,
                PhoneNumber = postCustomerDTO.PhoneNumber,
            };
            var entityEntry = context.Customers.Add(customer);
            context.SaveChanges();
            return entityEntry.Entity;
        }
        public void DeleteById(Customer customer)
        {
            context.Customers.Remove(customer);
            context.SaveChanges();
        }
        public Customer Update(Customer customer)
        {
            var result = context.Customers.Update(customer);
            context.SaveChanges();
            return result.Entity;
        }
    }
}
