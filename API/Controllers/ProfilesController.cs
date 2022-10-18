using Application.Profiles;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {

        private readonly IMediator mediator;

        public ProfilesController(IMediator mediator)
        {

            this.mediator = mediator;
        }



        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandleResult(await mediator.Send(new Details.Query { Username = username }));
        }
    }
}
