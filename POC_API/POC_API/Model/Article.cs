﻿namespace POC_API.Model
{
    public class Article
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public bool Available { get; set; }
        public string Manufacturer { get; set; }

    }
}
