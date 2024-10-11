using WheelsOnChain.Modules.Users.Application.DTO;
using WheelsOnChain.Modules.Users.Application.Queries.Login;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using WheelsOnChain.Modules.Users.Application.Queries.GetUser;
using WheelsOnChain.Modules.Users.Shared.DTO;


namespace WheelsOnChain.Modules.Users.Api.Controllers;

[ApiController]
[Route("auth")]
public class AuthenticationController : ControllerBase
{
    private readonly ISender _sender;

    public AuthenticationController(ISender sender)
    {
        _sender = sender;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginQuery loginQuery)
    {
        AuthenticationResultDto authResult = await _sender.Send(loginQuery);
        return Ok(authResult);
    }

    [HttpGet("me")]
    [Authorize]
    public async Task<IActionResult> Me()
    {
        if (string.IsNullOrWhiteSpace(HttpContext.User.Identity?.Name))
            return NotFound();
        var userId = Guid.Parse(HttpContext.User.Identity.Name);
        
        var token = HttpContext.Request.Headers["Authorization"].ToString().Split(" ")[1];
        
        AuthenticationResultDto user = await _sender.Send(new GetUserQuery(userId, token));
        return Ok(user);
    }
}

