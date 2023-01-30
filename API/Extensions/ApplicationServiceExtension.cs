using Application.Activities;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtension
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services
        , IConfigurationSection config)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDbContext<DataContext>(opt =>
          {       
            opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
        });
            services.AddCors(opt=> {
            opt.AddPolicy("CorsPolicy", policy=>
             {
            policy.AllowAnyMethod().AllowAnyMethod().WithOrigins("http://localhost:3000");

            });
            }    );
            services.AddMediatR(typeof(List.Handler));
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            return services;




        }
    }
}