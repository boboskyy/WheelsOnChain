using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WheelsOnChain.Modules.Organizations.Application;
using WheelsOnChain.Modules.Organizations.Infrastructure;
using WheelsOnChain.Modules.Organizations.Infrastructure.DAL;

namespace WheelsOnChain.Modules.Organizations.Api;

public static class DependencyInjection
{
    public static IServiceCollection AddOrganizationsModule(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddApplicationLayer();
        services.AddInfrastructureLayer(configuration);
        return services;
    }
    
    public static IApplicationBuilder UseOrganizationsModule(this IApplicationBuilder app)
    {
        return app;
    }
}
