using Microsoft.EntityFrameworkCore;
using WheelsOnChain.Modules.Organizations.Application.Repositories;
using WheelsOnChain.Modules.Organizations.Domain.Entities;
using WheelsOnChain.Modules.Organizations.Domain.ValueObjects;

namespace WheelsOnChain.Modules.Organizations.Infrastructure.DAL.Repositories;

internal class OrganizationRepository : IOrganizationRepository
{
    private readonly OrganizationsDbContext _dbContext;
    private readonly DbSet<Organization> _organizations;
    
    public OrganizationRepository(OrganizationsDbContext dbContext)
    {
        _dbContext = dbContext;
        _organizations = dbContext.Organizations;
    }

    public async Task<Organization> GetAsync(OrganizationId id)
    {
        var organization = await _organizations.SingleOrDefaultAsync(o => o.Id == id);
        return organization;
    }

    public async Task<IEnumerable<Organization>> GetByAddressList(IEnumerable<string> addresses)
    {
        var organizations = await _organizations.Where(o => addresses.Contains(o.Address)).ToListAsync();
        return organizations;
    }

    public async Task<IEnumerable<Organization>> BrowseAsync()
    {
        var organizations = (await _organizations.ToListAsync())
            .OrderBy(x => x.Address);
        return organizations;
    }

    public async Task AddAsync(Organization organization)
    {
        await _organizations.AddAsync(organization);
        await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateAsync(Organization organization)
    {
        _organizations.Update(organization);
        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(Organization organization)
    {
        _organizations.Remove(organization);
        await _dbContext.SaveChangesAsync();
    }
}