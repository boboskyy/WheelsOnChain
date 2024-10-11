using WheelsOnChain.Modules.Organizations.Application.Queries.DTO;

namespace WheelsOnChain.Modules.Organizations.Application.Queries.Browse.DTO;

public record BrowseOrganizationsDto
(
    IEnumerable<OrganizationDto> Organizations
);