using WheelsOnChain.Modules.Users.Application.DTO;
using MediatR;

namespace WheelsOnChain.Modules.Users.Application.Queries.Login;

public record LoginQuery(
    string Email,
    string Password
) : IRequest<AuthenticationResultDto>;

