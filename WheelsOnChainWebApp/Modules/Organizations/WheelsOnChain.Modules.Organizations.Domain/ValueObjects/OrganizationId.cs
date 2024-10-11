namespace WheelsOnChain.Modules.Organizations.Domain.ValueObjects;

public sealed class OrganizationId : IEquatable<OrganizationId>
{
    public Guid Value { get; }

    public OrganizationId() : this(Guid.NewGuid())
    {
    }

    public OrganizationId(Guid value)
    {
        Value = value;
    }

    public bool Equals(OrganizationId other)
    {
        if (ReferenceEquals(null, other)) return false;
        return ReferenceEquals(this, other) || Value.Equals(other.Value);
    }

    public override bool Equals(object obj)
    {
        if (ReferenceEquals(null, obj)) return false;
        if (ReferenceEquals(this, obj)) return true;
        return obj.GetType() == GetType() && Equals((OrganizationId)obj);
    }

    public override int GetHashCode() => Value.GetHashCode();

    public override string ToString() => Value.ToString();

    public static implicit operator OrganizationId(Guid value) => new(value);

    public static implicit operator Guid(OrganizationId value) => value.Value;
}

