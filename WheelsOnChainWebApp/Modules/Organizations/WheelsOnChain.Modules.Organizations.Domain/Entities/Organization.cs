using WheelsOnChain.Modules.Organizations.Domain.Enums;
using WheelsOnChain.Modules.Organizations.Domain.ValueObjects;

namespace WheelsOnChain.Modules.Organizations.Domain.Entities;

public class Organization
{
    public OrganizationId Id { get; private set; }
    public string Name { get; private set; }
    public string Address { get; private set; }
    public Trustiness Trustiness { get; private set; }
    
    private Organization()
    {
    }
    
    private Organization(
        OrganizationId id,
        string name,
        string address,
        Trustiness trustiness)
    {
        Id = id;
        Name = name;
        Address = address;
        Trustiness = trustiness;
    }
    
    public static Organization CreateOrganization(
        string name,
        string address,
        Trustiness trustiness)
    {
        return new Organization(
            Guid.NewGuid(),
            name,
            address,
            trustiness);
    }

    public void ChangeTrustiness(Trustiness trustiness)
    {
        Trustiness = trustiness;
    }
    
    public void ChangeOrganization(
        string name,
        string address,
        Trustiness trustiness)
    {
        Name = name;
        Address = address;
        Trustiness = trustiness;
    }
}