using MediatR;
using WheelsOnChain.Modules.Organizations.Application.DTO;
using WheelsOnChain.Modules.Organizations.Application.Queries.GetByAddressList.DTO;
using WheelsOnChain.Modules.Organizations.Application.Repositories;

namespace WheelsOnChain.Modules.Organizations.Application.Queries.GetByAddressList;

public class GetByAddressListHandler
: IRequestHandler<GetByAddressListQuery, GetByAddressListDto>
{
    private readonly IOrganizationRepository _organizationRepository;
    
    public GetByAddressListHandler(IOrganizationRepository organizationRepository)
    {
        _organizationRepository = organizationRepository;
    }
    
    public async Task<GetByAddressListDto> Handle(GetByAddressListQuery request, CancellationToken cancellationToken)
    {
        var organizations = await _organizationRepository.GetByAddressList(request.Addresses);
        
        return organizations.AsGetByAddressListDto();
    }
}