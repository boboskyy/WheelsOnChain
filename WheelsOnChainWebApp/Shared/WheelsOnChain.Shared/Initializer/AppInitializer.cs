using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace WheelsOnChain.Shared.Initializer;

public class AppInitializer : IHostedService
{
    private readonly IServiceProvider _serviceProvider;

    public AppInitializer(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        using var scope = _serviceProvider.CreateScope();
        var initializers = scope.ServiceProvider.GetServices<IInitializer>();
        foreach (var initializer in initializers)
        {
            try
            {
                await initializer.InitAsync();
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception.Message);
            }
        }
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }
}