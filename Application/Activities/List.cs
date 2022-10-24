using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class List
    {

        public class Query : IRequest<Result<PagedList<ActivityDTO>>>
        {

            public ActivityParams Params { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<PagedList<ActivityDTO>>>
        {

            private readonly IUserAccessor _accessor;
            private readonly DataContext _context;
            private readonly IMapper _mapper;


            public Handler(DataContext context, IMapper mapper,IUserAccessor accessor)
            {

                this._context = context;
                this._mapper = mapper;
                this._accessor = accessor;
            }
            public async Task<Result<PagedList<ActivityDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Activities
                    .Where(d=>d.Date>= request.Params.StartDate)
                    .OrderBy(d => d.Date)
                    .ProjectTo<ActivityDTO>(_mapper.ConfigurationProvider, new { username = _accessor.GetUserName() }).
                    AsQueryable();


                if (request.Params.IsGoing && !request.Params.IsHost) {

                    query = query.Where(x => x.Attendees.Any(a => a.Username == _accessor.GetUserName()));
                }

                if (request.Params.IsHost && !request.Params.IsGoing) {
                
                
                    query = query.Where(x=>x.HostUsername == _accessor.GetUserName());
                }






                return Result<PagedList<ActivityDTO>>.Success(
                    await PagedList<ActivityDTO>.CreateAsync(query, request.Params.PageNumber,
                    request.Params.PageSize));
            }
        }



    }
}
