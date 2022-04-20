using POC_API.DTO;
using POC_API.Model;
using POC_API.Repository;

namespace POC_API.Service
{
    public class CartService
    {
        private readonly CartRepository _repo;
        public CartService(CartRepository repo)
        {
            _repo = repo;
        }
        public List<Cart> GetAll()
        {
            var result = _repo.GetAll();
            var list = new List<Cart>();
            foreach (var item in result)
            {
                list.Add(new Cart()
                {
                    Id = item.Id,
                    ArticleId = item.ArticleId,
                    CustomerId = item.CustomerId,
                    Quantity = item.Quantity,
                });
            }
            return list;
        }
        public Cart GetById(int id)
        {
            var result = _repo.GetById(id);
            if (result == null)
            {
                throw new Exception("Incorrect ID");
            }
            return new Cart()
            {
                Id = result.Id,
                ArticleId = result.ArticleId,
                CustomerId = result.CustomerId,
                Quantity = result.Quantity,
            };
        }
        public Cart Create(PostCartDTO postCartDTO)
        {
            var result = _repo.Create(new Cart()
            {
                ArticleId = postCartDTO.ArticleId,
                CustomerId = postCartDTO.CustomerId,
                Quantity = postCartDTO.Quantity,
            });
            return new Cart()
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
        public Cart UpdateCart(int id)
        {
            var getbyId = _repo.GetById(id);
            if (getbyId == null)
            {
                throw new Exception("ID was not found");
            }
            var result = _repo.Update(getbyId);
            return new Cart()
            {
                Id = result.Id,
                ArticleId = result.ArticleId,
                CustomerId = result.CustomerId,
                Quantity = result.Quantity,
            };
        }
    }
}
