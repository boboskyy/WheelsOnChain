using MediatR;
using WheelsOnChain.Modules.Users.Application.DTO;
using WheelsOnChain.Modules.Users.Application.Exceptions;
using WheelsOnChain.Modules.Users.Application.Queries.Login;
using WheelsOnChain.Modules.Users.Application.Repositories;
using WheelsOnChain.Modules.Users.Shared.DTO;

namespace WheelsOnChain.Modules.Users.Application.Queries.GetUser;

public class GetUserHandler :
    IRequestHandler<GetUserQuery, AuthenticationResultDto>
{
    private readonly IUserRepository _userRepository;

    public GetUserHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }
    
    public async Task<AuthenticationResultDto> Handle(GetUserQuery request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetAsync(request.UserId);
        if (user is null)
        {
            throw new UserNotFoundException(request.UserId);
        }

        return new AuthenticationResultDto(new UserDto() {Id = user.Id, Email = user.Email}, request.Token);
    }
}