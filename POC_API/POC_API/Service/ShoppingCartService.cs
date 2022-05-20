using POC_API.DTO;
using POC_API.Model;
using POC_API.Repository;

namespace POC_API.Service
{
    public class ShoppingCartService
    {
        private readonly ShoppingCartRepository _repo;
        public ShoppingCartService(ShoppingCartRepository repo)
        {
            _repo = repo;
        }
        public List<ShoppingCart> GetAll()
        {
            var result = _repo.GetAll();
            var list = new List<ShoppingCart>();
            foreach (var item in result)
            {
                list.Add(new ShoppingCart()
                {
                    Id = item.Id,
                    ArticleId = item.ArticleId,
                    CustomerId = item.CustomerId,
                    Quantity = item.Quantity,
                });
            }
            return list;
        }
        public ShoppingCart GetById(int id)
        {
            var result = _repo.GetById(id);
            if (result == null)
            {
                throw new Exception("Incorrect ID");
            }
            return new ShoppingCart()
            {
                Id = result.Id,
                ArticleId = result.ArticleId,
                CustomerId = result.CustomerId,
                Quantity = result.Quantity,
            };
        }
        public ShoppingCart Create(PostShoppingCartDTO postCartDTO)
        {
            var result = _repo.Create(new PostShoppingCartDTO()
            {
                ArticleId = postCartDTO.ArticleId,
                CustomerId = postCartDTO.CustomerId,
                Quantity = postCartDTO.Quantity,
            });
            return new ShoppingCart()
            {
                ArticleId = result.ArticleId,
                CustomerId = result.CustomerId,
                Quantity = result.Quantity,
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
        public ShoppingCart UpdateCart(int id, PostShoppingCartDTO updateCartDTO)
        {
            var cart = _repo.GetById(id);
            if (cart == null)
            {
                throw new Exception("ID was not found");
            }
            cart.Id = id;
            cart.ArticleId = updateCartDTO.ArticleId;
            cart.CustomerId = updateCartDTO.CustomerId;
            cart.Quantity = updateCartDTO.Quantity;
            _repo.Update(cart);
            return cart;
        }
    }
}
