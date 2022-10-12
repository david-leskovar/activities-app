using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Application;
using MediatR;
using Application.Activities;
using System.Threading.Tasks;
using System;
using Microsoft.AspNetCore.Authorization;

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
        public async Task<IActionResult> GetActivities()
        {

            return HandleResult(await mediator.Send(new List.Query()));

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

        [HttpPut("{id}")]

        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {

            activity.Id = id;

            return HandleResult(await mediator.Send(new Edit.Command { Activity = activity }));


        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteActivity(Guid id)
        {



            return HandleResult(await mediator.Send(new Delete.Command { Id = id }));


        }






    }
}
