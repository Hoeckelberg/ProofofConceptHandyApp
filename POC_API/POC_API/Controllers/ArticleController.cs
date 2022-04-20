using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using POC_API.DTO;
using POC_API.Service;

namespace POC_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly ArticleService _articleService;

        public ArticleController(ArticleService articleService)
        {
            _articleService = articleService;
        }
        [HttpGet]
        public IActionResult GetAllArticles()
        {
            var result = _articleService.GetAll();
            return Ok(result);
        }
        [HttpGet("{id}")]
        public IActionResult GetArticleById(int id)
        {
            var result = _articleService.GetById(id);
            return Ok(result);
        }
        [HttpPost]
        public IActionResult PostArticle(PostArticleDTO postArticleDTO)
        {
            var result = _articleService.Create(postArticleDTO);
            return Ok(result);
        }
        [HttpPut("{id}")]
        public IActionResult UpdateArticle(int id, PostArticleDTO updateArticleDTO)
        {
            var result = _articleService.UpdateArticle(id, updateArticleDTO);
            return Ok(result);
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteReiseZiel(int id)
        {
            _articleService.DeleteById(id);
            return NoContent();
        }
    }
}
