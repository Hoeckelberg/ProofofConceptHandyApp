namespace POC_API.Model
{
    public class ShoppingCart
    {
        public int Id { get; set; }
        public int ArticleId { get; set; }
        public int CustomerId { get; set; }
        public int Quantity { get; set; }
    }
}
