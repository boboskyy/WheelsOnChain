﻿using System.Reflection;
using Microsoft.Extensions.DependencyInjection;

namespace WheelsOnChain.Modules.Organizations.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplicationLayer(this IServiceCollection services)
    {
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(Assembly.GetExecutingAssembly()));
        return services;
    }
}
