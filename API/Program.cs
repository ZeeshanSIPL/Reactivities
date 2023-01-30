using Application.Activities;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using AutoMapper;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors(opt=>
{
    opt.AddPolicy("CorsPolicy", policy=>
    {
    policy.AllowAnyMethod().AllowAnyMethod().WithOrigins("http://localhost:3000");

    });
 });
 builder.Services.AddMediatR(typeof(List.Handler));
 builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);

var app = builder.Build();
 
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("CorsPolicy"); 

app.UseAuthorization();

app.MapControllers();
using var scope= app.Services.CreateScope();
var services=scope.ServiceProvider;
try
{
    var context= services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context);

}
catch (Exception ex)
{
    
    var logger=services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex,"An error occured during Migration");

}

app.Run();
