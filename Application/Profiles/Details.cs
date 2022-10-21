using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles
{
    public class Details
    {

        public class Query : IRequest<Result<Profile>> {

            public string Username { get; set; }

        
        }

        public class Handler : IRequestHandler<Query, Result<Profile>>
        {

            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            private readonly DataContext _context;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor) {
                this._mapper = mapper;
                this._context = context;
                this._userAccessor = userAccessor;
                
            
            }


            public async Task<Result<Profile>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.ProjectTo<Profile>(_mapper.ConfigurationProvider, new {username=_userAccessor.GetUserName() })
                    .SingleOrDefaultAsync(x=>x.Username==request.Username);

                if (user == null) return null;

                return Result<Profile>.Success(user);
            }
        }
    }
}
