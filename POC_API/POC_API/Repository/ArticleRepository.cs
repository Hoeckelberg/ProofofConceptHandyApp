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
            return context.articles.ToList();
        }
        public Article GetById(int id)
        {
            var result = context.articles.Find(id);
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
            var entityEntry = context.articles.Add(article);
            context.SaveChanges();
            return entityEntry.Entity;
        }
        public void DeleteById(Article article)
        {
            context.articles.Remove(article);
            context.SaveChanges();
        }
        public Article Update(Article article)
        {
            var result = context.articles.Update(article);
            context.SaveChanges();
            return result.Entity;
        }
    }
}
