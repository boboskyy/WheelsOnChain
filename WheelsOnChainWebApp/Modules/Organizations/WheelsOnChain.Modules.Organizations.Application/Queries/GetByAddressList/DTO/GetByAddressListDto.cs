using WheelsOnChain.Modules.Organizations.Application.Queries.DTO;

namespace WheelsOnChain.Modules.Organizations.Application.Queries.GetByAddressList.DTO;

public record GetByAddressListDto(
        IEnumerable<PublicOrganizationDto> Organizations
    );