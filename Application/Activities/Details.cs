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
    public class Details
    {
        public class Query : IRequest<Result<ActivityDTO>>
        {

            public Guid Id { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<ActivityDTO>>
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


            public async Task<Result<ActivityDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.
                    ProjectTo<ActivityDTO>(_mapper.ConfigurationProvider,new {username=_accessor.GetUserName()})
                   .FirstOrDefaultAsync(x => x.Id == request.Id);
                return Result<ActivityDTO>.Success(activity);
            }
        }


    }
}
