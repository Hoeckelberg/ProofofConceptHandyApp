using POC_API.Data;
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
        public Article Create(Article postArticle)
        {
            Article article = new Article(postArticle.Name, postArticle.Price, postArticle.Description, postArticle.Available, postArticle.Manufacturer);
            var entityEntry = context.articles.Add(postArticle);
            context.SaveChanges();
            return entityEntry.Entity;
        }
        public void DeleteById(ReiseZiel reiseZiel)
        {
            context.ReiseZiele.Remove(reiseZiel);
            context.SaveChanges();
        }
        public ReiseZiel Update(ReiseZiel reiseZiel)
        {
            var result = context.ReiseZiele.Update(reiseZiel);
            context.SaveChanges();
            return result.Entity;
        }
    }
}
