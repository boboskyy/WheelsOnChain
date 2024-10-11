using WheelsOnChain.Modules.Organizations.Application.Queries.Browse.DTO;
using WheelsOnChain.Modules.Organizations.Application.Queries.DTO;
using WheelsOnChain.Modules.Organizations.Application.Queries.GetByAddressList.DTO;
using WheelsOnChain.Modules.Organizations.Domain.Entities;

namespace WheelsOnChain.Modules.Organizations.Application.DTO;

public static class Extensions
{
    public static GetByAddressListDto AsGetByAddressListDto(this IEnumerable<Organization> organizations)
        => new GetByAddressListDto(organizations.Select(o => o.AsPublicDto()));
    
    public static BrowseOrganizationsDto AsBrowseOrganizationsDto(this IEnumerable<Organization> organizations)
        => new BrowseOrganizationsDto(organizations.Select(o => o.AsDto()));
    
    public static OrganizationDto AsDto(this Organization organization)
        => new OrganizationDto(organization.Id, organization.Address, organization.Name,
            new TrustinessDto((int)organization.Trustiness, organization.Trustiness.ToString()));
    
    public static PublicOrganizationDto AsPublicDto(this Organization organization)
        => new PublicOrganizationDto(organization.Address, organization.Name,
            new TrustinessDto((int)organization.Trustiness, organization.Trustiness.ToString()));
}