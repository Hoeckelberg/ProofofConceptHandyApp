using POC_API.Service;
using POC_API.Model;
using POC_API.Repository;
using Microsoft.EntityFrameworkCore;
using POC_API.Data;
using Microsoft.AspNetCore.Authentication.Certificate;

var builder = WebApplication.CreateBuilder(args);

string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

// Add services to the container.
//builder.Services.AddCors(options => options.AddPolicy("corsapp", builder =>
//{
//    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
//}));

builder.Services.AddCors(options =>
{
options.AddPolicy(MyAllowSpecificOrigins,
builder =>
{
builder.AllowAnyOrigin()/*WithOrigins("https://compasslicenseclient.azurewebsites.net")*/.AllowAnyHeader().AllowAnyMethod()/*.AllowCredentials()*//*.SetIsOriginAllowed(((host) => true))*/;
//builder.AllowAnyOrigin();
});
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddScoped<ShoppingCartService>();
builder.Services.AddScoped<ArticleService>();
builder.Services.AddScoped<CustomerService>();
builder.Services.AddScoped<ShoppingCartRepository>();
builder.Services.AddScoped<ArticleRepository>();
builder.Services.AddScoped<CustomerRepository>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>(options => options.UseSqlServer("name=ConnectionStrings:DefaultConnection"));
builder.Services.AddRouting(options => options.LowercaseUrls = true);
builder.Services.AddAuthentication(
        CertificateAuthenticationDefaults.AuthenticationScheme)
    .AddCertificate();
var app = builder.Build();

app.UseAuthentication();
app.UseCertificateForwarding();
app.UseSwagger();
app.UseSwaggerUI();
app.UseRouting();
app.UseAuthorization();
app.UseHttpsRedirection();
app.UseCors(MyAllowSpecificOrigins);
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers().RequireCors(MyAllowSpecificOrigins);
});

app.MapControllers();
app.Run();
