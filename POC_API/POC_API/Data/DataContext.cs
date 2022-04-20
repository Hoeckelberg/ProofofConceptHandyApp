using Microsoft.EntityFrameworkCore;
using POC_API.Model;

namespace POC_API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Article> articles { get; set; }
        public DbSet<Cart> carts { get; set; }
        public DbSet<Customer> customers { get; set; }
    }
}
