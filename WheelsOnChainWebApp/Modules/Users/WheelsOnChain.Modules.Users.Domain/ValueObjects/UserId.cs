
namespace WheelsOnChain.Modules.Users.Domain.ValueObjects;

public sealed class UserId : IEquatable<UserId>
{
    public Guid Value { get; }

    public UserId() : this(Guid.NewGuid())
    {
    }

    public UserId(Guid value)
    {
        Value = value;
    }

    public bool Equals(UserId other)
    {
        if (ReferenceEquals(null, other)) return false;
        return ReferenceEquals(this, other) || Value.Equals(other.Value);
    }

    public override bool Equals(object obj)
    {
        if (ReferenceEquals(null, obj)) return false;
        if (ReferenceEquals(this, obj)) return true;
        return obj.GetType() == GetType() && Equals((UserId)obj);
    }

    public override int GetHashCode() => Value.GetHashCode();

    public override string ToString() => Value.ToString();

    public static implicit operator UserId(Guid value) => new(value);

    public static implicit operator Guid(UserId value) => value.Value;
}

