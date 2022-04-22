﻿using POC_API.Data;
using POC_API.DTO;
using POC_API.Model;

namespace POC_API.Repository
{
    public class CartRepository
    {
        private readonly DataContext context;

        public CartRepository(DataContext context)
        {
            this.context = context;
        }
        public List<Cart> GetAll()
        {
            return context.carts.ToList();
        }
        public Cart GetById(int id)
        {
            var result = context.carts.Find(id);
            return result;
        }
        public Cart Create(PostCartDTO postCartDTO)
        {
            Cart cart = new Cart()
            {
                ArticleId = postCartDTO.ArticleId,
                CustomerId = postCartDTO.CustomerId,
                Quantity = postCartDTO.Quantity,
            };
            var entityEntry = context.carts.Add(cart);
            context.SaveChanges();
            return entityEntry.Entity;
        }
        public void DeleteById(Cart cart)
        {
            context.carts.Remove(cart);
            context.SaveChanges();
        }
        public Cart Update(Cart cart)
        {
            var result = context.carts.Update(cart);
            context.SaveChanges();
            return result.Entity;
        }
    }
}
