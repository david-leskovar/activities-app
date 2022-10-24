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

        [HttpPut]
        public async Task<IActionResult> Edit(Edit.Command command)
        {
            return HandleResult(await mediator.Send(command));
        }

        [HttpGet("{username}/activities")]
        public async Task<IActionResult> GetUserActivities(string username,string predicate)
        {
            return HandleResult(await mediator.Send(new ListActivities.Query
            { Username = username, Predicate = predicate }));
        }
    }
}
