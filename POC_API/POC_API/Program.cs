using POC_API.Service;
using POC_API.Model;
using POC_API.Repository;
using Microsoft.EntityFrameworkCore;
using POC_API.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddScoped<CartService>();
builder.Services.AddScoped<ArticleService>();
builder.Services.AddScoped<CustomerService>();
builder.Services.AddScoped<CartRepository>();
builder.Services.AddScoped<ArticleRepository>();
builder.Services.AddScoped<CustomerRepository>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>(options => options.UseSqlServer("name=ConnectionStrings:DefaultConnection"));
builder.Services.AddRouting(options => options.LowercaseUrls = true);
builder.Services.AddCors(options => options.AddDefaultPolicy(policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseRouting();

    app.UseCors();

}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
