﻿using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{


    public class ActivitiesController : BaseApiController
    {

        public ActivitiesController(DataContext context)
        {
            _context = context;
        }

        private readonly DataContext _context;

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {

            return await _context.Activities.ToListAsync();

        }


        [HttpGet("{id}")]


        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {

            return await _context.Activities.FindAsync(id);
        }




    }
}
