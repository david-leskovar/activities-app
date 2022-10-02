using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Application;
using MediatR;
using Application.Activities;

namespace API.Controllers
{


    public class ActivitiesController : BaseApiController
    {
        private readonly IMediator mediator;

        public ActivitiesController(IMediator mediator)
        {
            this.mediator = mediator;
        }



        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {

            return await mediator.Send(new List.Query());

        }


        [HttpGet("{id}")]


        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {

            return await mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]

        public async Task<IActionResult> CreateActivity([FromBody] Activity activity)
        {

            return Ok(await mediator.Send(new Create.Command { Activity = activity }));


        }

        [HttpPut("{id}")]

        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {

            activity.Id = id;

            return Ok(await mediator.Send(new Edit.Command { Activity = activity }));


        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteActivity(Guid id)
        {



            return Ok(await mediator.Send(new Delete.Command { Id = id }));


        }






    }
}
