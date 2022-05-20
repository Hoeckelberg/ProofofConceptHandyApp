using POC_API.Data;
using POC_API.DTO;
using POC_API.Model;

namespace POC_API.Repository
{
    public class ShoppingCartRepository
    {
        private readonly DataContext context;

        public ShoppingCartRepository(DataContext context)
        {
            this.context = context;
        }
        public List<ShoppingCart> GetAll()
        {
            return context.ShoppingCarts.ToList();
        }
        public ShoppingCart GetById(int id)
        {
            var result = context.ShoppingCarts.Find(id);
            return result;
        }
        public ShoppingCart Create(PostShoppingCartDTO postCartDTO)
        {
            ShoppingCart cart = new ShoppingCart()
            {
                ArticleId = postCartDTO.ArticleId,
                CustomerId = postCartDTO.CustomerId,
                Quantity = postCartDTO.Quantity,
            };
            var entityEntry = context.ShoppingCarts.Add(cart);
            context.SaveChanges();
            return entityEntry.Entity;
        }
        public void DeleteById(ShoppingCart cart)
        {
            context.ShoppingCarts.Remove(cart);
            context.SaveChanges();
        }
        public ShoppingCart Update(ShoppingCart cart)
        {
            var result = context.ShoppingCarts.Update(cart);
            context.SaveChanges();
            return result.Entity;
        }
    }
}
