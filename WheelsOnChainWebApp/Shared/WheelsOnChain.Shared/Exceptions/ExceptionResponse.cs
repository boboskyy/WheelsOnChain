
using System.Net;

namespace WheelsOnChain.Shared.Exceptions;
public sealed record ExceptionResponse(object Response, HttpStatusCode StatusCode);
