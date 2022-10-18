using Application.Photos;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class PhotosController : BaseApiController
    {

        private readonly IMediator mediator;

        public PhotosController(IMediator mediator)
        {

            this.mediator = mediator;
        }


        [HttpPost]
        public async Task<IActionResult> Add([FromForm] Add.Command command) {


            return HandleResult(await mediator.Send(command));
        
        
        
        
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id) {

            return HandleResult(await mediator.Send(new Delete.Command { Id = id }));

        }

        [HttpPost("{id}/setMain")]

        public async Task<IActionResult> SetMain(string id)
        {

            return HandleResult(await mediator.Send(new SetMain.Command { Id = id }));

        }

    }
}
