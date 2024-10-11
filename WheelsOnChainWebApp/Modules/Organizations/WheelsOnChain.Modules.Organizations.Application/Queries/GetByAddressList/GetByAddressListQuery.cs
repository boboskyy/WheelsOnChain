using MediatR;
using WheelsOnChain.Modules.Organizations.Application.DTO;
using WheelsOnChain.Modules.Organizations.Application.Queries.GetByAddressList.DTO;

namespace WheelsOnChain.Modules.Organizations.Application.Queries.GetByAddressList;

public record GetByAddressListQuery
(
    IEnumerable<string> Addresses
): IRequest<GetByAddressListDto>;