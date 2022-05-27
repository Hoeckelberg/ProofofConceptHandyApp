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
        public ShoppingCart Create(PostShoppingCartDTO postShoppingCartDTO)
        {
            ShoppingCart shoppingCart = new ShoppingCart()
            {
                ArticleId = postShoppingCartDTO.ArticleId,
                CustomerId = postShoppingCartDTO.CustomerId,
                Quantity = postShoppingCartDTO.Quantity,
            };
            var entityEntry = context.ShoppingCarts.Add(shoppingCart);
            context.SaveChanges();
            return entityEntry.Entity;
        }
        public void DeleteById(ShoppingCart shoppingCart)
        {
            context.ShoppingCarts.Remove(shoppingCart);
            context.SaveChanges();
        }
        public ShoppingCart Update(ShoppingCart shoppingCart)
        {
            var result = context.ShoppingCarts.Update(shoppingCart);
            context.SaveChanges();
            return result.Entity;
        }
    }
}
