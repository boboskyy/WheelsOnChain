using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WheelsOnChain.Modules.Organizations.Application.Commands.ChangeOrganization;
using WheelsOnChain.Modules.Organizations.Application.Commands.ChangeOrganizationTrustiness;
using WheelsOnChain.Modules.Organizations.Application.Commands.CreateOrganization;
using WheelsOnChain.Modules.Organizations.Application.Commands.DeleteOrganization;
using WheelsOnChain.Modules.Organizations.Application.Queries.Browse;
using WheelsOnChain.Modules.Organizations.Application.Queries.GetByAddressList;

namespace WheelsOnChain.Modules.Organizations.Api.Controllers;

[ApiController]
[Route("organizations")]
public class OrganizationController : ControllerBase
{
    private readonly ISender _sender;
    
    public OrganizationController(ISender sender)
    {
        _sender = sender;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetByAddressList([FromQuery] IEnumerable<string> addresses)
    {
        var query = new GetByAddressListQuery(addresses);
        var organizations = await _sender.Send(query);
        return Ok(organizations);
    }
    
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateOrganization([FromBody] CreateOrganizationCommand command)
    {
        await _sender.Send(command);
        return Ok();
    }
    
    [HttpPut("{organizationId}/trustiness")]
    [Authorize]
    public async Task<IActionResult> ChangeOrganizationTrustiness([FromRoute] Guid organizationId, [FromBody] ChangeOrganizationTrustinessCommand command)
    {
        command.OrganizationId = organizationId;
        await _sender.Send(command);
        return Ok();
    }
    
    [HttpPut("{organizationId}")]
    [Authorize]
    public async Task<IActionResult> ChangeOrganization([FromRoute] Guid organizationId, [FromBody] ChangeOrganizationCommand command)
    {
        command.OrganizationId = organizationId;
        await _sender.Send(command);
        return Ok();
    }

    [HttpDelete("{organizationId}")]
    [Authorize]
    public async Task<IActionResult> DeleteOrganization([FromRoute] Guid organizationId)
    {
        var command = new DeleteOrganizationCommand() { OrganizationId = organizationId };
        await _sender.Send(command);
        return NoContent();
    }
    
    [HttpGet("browse")]
    [Authorize]
    public async Task<IActionResult> Browse([FromQuery] string? search)
    {
        var query = new BrowseOrganizationsQuery(search);
        var organizations = await _sender.Send(query);
        return Ok(organizations);
    }
}