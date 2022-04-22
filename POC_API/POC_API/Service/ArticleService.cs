using POC_API.DTO;
using POC_API.Model;
using POC_API.Repository;

namespace POC_API.Service
{
    public class ArticleService
    {
        private readonly ArticleRepository _repo;
        public ArticleService(ArticleRepository repo)
        {
            _repo = repo;
        }
        public List<Article> GetAll()
        {
            var result = _repo.GetAll();
            var list = new List<Article>();
            foreach (var item in result)
            {
                list.Add(new Article()
                {
                    Id = item.Id,
                    Name = item.Name,
                    Price = item.Price,
                    Description = item.Description,
                    Available = item.Available,
                    Manufacturer = item.Manufacturer,
                });
            }
            return list;
        }
        public Article GetById(int id)
        {
            var result = _repo.GetById(id);
            if (result == null)
            {
                throw new Exception("Incorrect ID");
            }
            return new Article()
            {
                Id = result.Id,
                Name = result.Name,
                Price = result.Price,
                Description = result.Description,
                Available = result.Available,
                Manufacturer = result.Manufacturer,
            };
        }
        public Article Create(PostArticleDTO postArticleDTO)
        {
            var result = _repo.Create(new PostArticleDTO()
            {
                Name = postArticleDTO.Name,
                Price = postArticleDTO.Price,
                Description = postArticleDTO.Description,
                Available = postArticleDTO.Available,
                Manufacturer = postArticleDTO.Manufacturer,
            });
            return new Article()
            {
                Name = result.Name,
                Price = result.Price,
                Description = result.Description,
                Available = result.Available,
                Manufacturer = result.Manufacturer,
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
        public Article UpdateArticle(int id, PostArticleDTO updateArticleDTO)
        {
            var article = _repo.GetById(id);
            if (article == null)
            {
                throw new Exception("ID was not found");
            }
            article.Id = id;
            article.Name = updateArticleDTO.Name;
            article.Price = updateArticleDTO.Price;
            article.Description = updateArticleDTO.Description;
            article.Available = updateArticleDTO.Available;
            article.Manufacturer = updateArticleDTO.Manufacturer;
            _repo.Update(article);
            return article;
        }
    }
}
