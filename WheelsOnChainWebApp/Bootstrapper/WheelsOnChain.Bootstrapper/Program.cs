using WheelsOnChain.Modules.Organizations.Api;
using WheelsOnChain.Shared;
using WheelsOnChain.Modules.Users.Api;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services
    .AddUsersModule(builder.Configuration)
    .AddOrganizationsModule(builder.Configuration)
    .AddSharedFramework(builder.Configuration);

var app = builder.Build();

app.UseSharedFramework();
app.UseUsersModule();
app.UseOrganizationsModule();

app.UseHttpsRedirection();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapGet("/", ctx => ctx.Response.WriteAsync("WheelsOnChain API"));
});

app.Run();
