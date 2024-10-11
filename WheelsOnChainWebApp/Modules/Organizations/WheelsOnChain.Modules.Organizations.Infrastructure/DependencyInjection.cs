using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WheelsOnChain.Modules.Organizations.Application.Repositories;
using WheelsOnChain.Modules.Organizations.Infrastructure.DAL;
using WheelsOnChain.Modules.Organizations.Infrastructure.DAL.Repositories;
using WheelsOnChain.Shared.Database;
using Microsoft.EntityFrameworkCore.Design;
using WheelsOnChain.Modules.Organizations.Infrastructure.DAL.Initializers;
using WheelsOnChain.Shared.Initializer;

namespace WheelsOnChain.Modules.Organizations.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureLayer(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddPostgres<OrganizationsDbContext>();
        services.AddScoped<IOrganizationRepository, OrganizationRepository>();
        services.AddTransient<IInitializer, OrganizationInitializer>();
        return services;
    }
}