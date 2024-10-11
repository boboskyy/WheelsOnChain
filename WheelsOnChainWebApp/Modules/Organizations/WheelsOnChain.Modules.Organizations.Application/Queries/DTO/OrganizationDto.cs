namespace WheelsOnChain.Modules.Organizations.Application.Queries.DTO;

public record OrganizationDto(
    Guid Id,
    string Address,
    string Name,
    TrustinessDto Trustiness
);

public record PublicOrganizationDto(
    string Address,
    string Name,
    TrustinessDto Trustiness
);
    
public record TrustinessDto(int code, string name);