using Microsoft.EntityFrameworkCore;
using POC_API.Model;

namespace POC_API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Article> Articles { get; set; }
        public DbSet<ShoppingCart> ShoppingCarts { get; set; }
        public DbSet<Customer> Customers { get; set; }
    }
}
