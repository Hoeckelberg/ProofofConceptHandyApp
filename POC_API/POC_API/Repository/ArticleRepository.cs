using POC_API.Data;
using POC_API.DTO;
using POC_API.Model;

namespace POC_API.Repository
{
    public class ArticleRepository
    {
        private readonly DataContext context;

        public ArticleRepository(DataContext context)
        {
            this.context = context;
        }
        public List<Article> GetAll()
        {
            return context.Articles.ToList();
        }
        public Article GetById(int id)
        {
            var result = context.Articles.Find(id);
            return result;
        }
        public Article Create(PostArticleDTO postArticleDTO)
        {
            Article article = new Article()
            {
                Name = postArticleDTO.Name,
                Price = postArticleDTO.Price,
                Description = postArticleDTO.Description,
                Available = postArticleDTO.Available,
                Manufacturer = postArticleDTO.Manufacturer
            };
            var entityEntry = context.Articles.Add(article);
            context.SaveChanges();
            return entityEntry.Entity;
        }
        public void DeleteById(Article article)
        {
            context.Articles.Remove(article);
            context.SaveChanges();
        }
        public Article Update(Article article)
        {
            var result = context.Articles.Update(article);
            context.SaveChanges();
            return result.Entity;
        }
    }
}
