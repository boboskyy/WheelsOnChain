

using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using WheelsOnChain.Modules.Users.Application.Interfaces.Authentication;
using WheelsOnChain.Modules.Users.Application.Repositories;
using WheelsOnChain.Modules.Users.Infrastructure.Authentication;
using WheelsOnChain.Modules.Users.Infrastructure.DAL;
using WheelsOnChain.Modules.Users.Infrastructure.DAL.Repositories;
using WheelsOnChain.Shared.Database;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using WheelsOnChain.Modules.Users.Infrastructure.DAL.Initializers;
using WheelsOnChain.Shared.Initializer;

namespace WheelsOnChain.Modules.Users.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureLayer(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.Configure<JwtSettings>(configuration.GetSection(JwtSettings.SectionName));
        services.AddSingleton<IJwtTokenGenerator, JwtTokenGenerator>();
        services.AddSingleton<IPasswordHasher, PasswordHasher>();
        services.AddPostgres<UsersDbContext>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddTransient<IInitializer, UserInitializer>();

        var jwtSettings = new JwtSettings();
        configuration.GetSection(JwtSettings.SectionName).Bind(jwtSettings);
       
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtSettings.Issuer,
                    ValidAudience = jwtSettings.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Secret)),
                };
            });
        
        return services;
    }
}

