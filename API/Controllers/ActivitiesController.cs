using Domain;
using Microsoft.AspNetCore.Mvc;

using MediatR;
using Application.Activities;
using System.Threading.Tasks;
using System;
using Microsoft.AspNetCore.Authorization;
using Application.Core;

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
        public async Task<IActionResult> GetActivities([FromQuery]ActivityParams param)
        {

            return HandlePagedResult(await mediator.Send(new List.Query {Params=param }));

        }

        [Authorize]
        [HttpGet("{id}")]


        public async Task<ActionResult> GetActivity(Guid id)
        {

            return HandleResult(await mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]

        public async Task<IActionResult> CreateActivity([FromBody] Activity activity)
        {

            return HandleResult(await mediator.Send(new Create.Command { Activity = activity }));


        }


        [Authorize(Policy = "IsActivityHost")]
        [HttpPut("{id}")]

        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {

            activity.Id = id;

            return HandleResult(await mediator.Send(new Edit.Command { Activity = activity }));


        }

        [Authorize(Policy = "IsActivityHost")]
        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteActivity(Guid id)
        {



            return HandleResult(await mediator.Send(new Delete.Command { Id = id }));


        }

        [HttpPost("{id}/attend")]

        public async Task<IActionResult> Attend(Guid id) { 
        
            return HandleResult(await mediator.Send(new UpdateAttendance.Command { Id = id}));
        
        
        }






    }
}
