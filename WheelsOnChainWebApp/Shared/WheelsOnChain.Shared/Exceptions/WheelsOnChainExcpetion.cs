namespace WheelsOnChain.Shared.Exceptions;

public abstract class WheelsOnChainExcpetion : Exception
{
    protected WheelsOnChainExcpetion(string message) : base(message)
    {
    }
}
