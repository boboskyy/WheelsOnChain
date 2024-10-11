using WheelsOnChain.Modules.Users.Application.DTO;
using WheelsOnChain.Modules.Users.Application.Exceptions;
using WheelsOnChain.Modules.Users.Application.Interfaces.Authentication;
using WheelsOnChain.Modules.Users.Application.Repositories;
using WheelsOnChain.Modules.Users.Domain.Entities;
using MediatR;
using WheelsOnChain.Modules.Users.Shared.DTO;

namespace WheelsOnChain.Modules.Users.Application.Queries.Login;

public class LoginQueryHandler :
    IRequestHandler<LoginQuery, AuthenticationResultDto>
{
    private readonly IJwtTokenGenerator _jwtTokenGenerator;
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasher _passwordHasher;

    public LoginQueryHandler(IJwtTokenGenerator jwtTokenGenerator, IUserRepository userRepository, IPasswordHasher passwordHasher)
    {
        _jwtTokenGenerator = jwtTokenGenerator;
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
    }

    public async Task<AuthenticationResultDto> Handle(LoginQuery request, CancellationToken cancellationToken)
    {
        User user = await _userRepository.GetUserByEmail(request.Email);

        if (user is null || !_passwordHasher.Verify(user.PasswordHash, request.Password))
        {
            throw new InvalidUserPasswordException(request.Email);
        }

        var token = _jwtTokenGenerator.GenerateToken(user);
        
        return new AuthenticationResultDto(new UserDto() {Id = user.Id, Email = user.Email}, token);
    }
}
