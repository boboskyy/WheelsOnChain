using WheelsOnChain.Shared.Database;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using WheelsOnChain.Shared.Exceptions;
using WheelsOnChain.Shared.Initializer;

namespace WheelsOnChain.Shared;

public static class DependencyInjection
{
    public static IServiceCollection AddSharedFramework(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddCorsPolicy();
        services.AddErrorHandling();
        services.AddPostgres(configuration);
        
        services.AddControllers();
        services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        services.AddSingleton<IHostedService, AppInitializer>();
        
        
        return services;
    }

    public static IApplicationBuilder UseSharedFramework(this IApplicationBuilder app)
    {
        app.UseErrorHandling();
        app.UseCors("AllowSpecificOrigin");
        app.UseRouting();

        return app;
    }
    
    public static IServiceCollection AddCorsPolicy(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy("AllowSpecificOrigin",
                builder =>
                {
                    builder.WithOrigins("*")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
        });
        return services;
    }
}

