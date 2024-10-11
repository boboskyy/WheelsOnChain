using MediatR;
using WheelsOnChain.Modules.Users.Application.DTO;
using WheelsOnChain.Modules.Users.Shared.DTO;

namespace WheelsOnChain.Modules.Users.Application.Queries.GetUser;

public record GetUserQuery(Guid UserId, String Token) : IRequest<AuthenticationResultDto>;