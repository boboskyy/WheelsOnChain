using MediatR;
using WheelsOnChain.Modules.Organizations.Application.Queries.Browse.DTO;

namespace WheelsOnChain.Modules.Organizations.Application.Queries.Browse;

public record BrowseOrganizationsQuery(string? Search) : IRequest<BrowseOrganizationsDto>;