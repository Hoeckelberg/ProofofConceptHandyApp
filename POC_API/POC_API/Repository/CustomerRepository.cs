using POC_API.Data;
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
            return context.customers.ToList();
        }
        public Customer GetById(int id)
        {
            var result = context.customers.Find(id);
            return result;
        }
        public Customer Create(Customer postCustomer)
        {
            Customer customer = new Customer()
            {
                Name = postCustomer.Name,
                Address = postCustomer.Address,
                Owner = postCustomer.Owner,
                PhoneNumber = postCustomer.PhoneNumber,
            };
            var entityEntry = context.customers.Add(customer);
            context.SaveChanges();
            return entityEntry.Entity;
        }
        public void DeleteById(Customer customer)
        {
            context.customers.Remove(customer);
            context.SaveChanges();
        }
        public Customer Update(Customer customer)
        {
            var result = context.customers.Update(customer);
            context.SaveChanges();
            return result.Entity;
        }
    }
}
