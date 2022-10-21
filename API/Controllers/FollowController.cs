using Application.Followers;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class FollowController : BaseApiController
    {
        private readonly IMediator mediator;

        public FollowController(IMediator mediator)
        {

            this.mediator = mediator;
        }


        [HttpPost("{username}")]
        public async Task<IActionResult> Follow(string username) {

            return HandleResult(await mediator.Send(new FollowToggle.Command { TargetUsername = username }));

        }

        [HttpGet("{username}")]

        public async Task<IActionResult> GetFollowing(string username,string predicate) {

            return HandleResult(await mediator.Send(new List.Query { Username = username, Predicate = predicate }));
        
        }
    }
}
