using Application.Core;
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

namespace Application.Comments
{
    public class List
    {
        public class Query : IRequest<Result<List<CommentDTO>>> {

            public Guid ActivityId { get; set; }
        


        }

        public class Handler : IRequestHandler<Query, Result<List<CommentDTO>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context,IMapper mapper) { 
                this._context = context;
                this._mapper = mapper;
            
            
            }
            public async Task<Result<List<CommentDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {

                var comments = await _context.Comments.Where(x => x.Activity.Id == request.ActivityId)
                    .OrderByDescending(x => x.CreatedAt).ProjectTo<CommentDTO>(_mapper.ConfigurationProvider).ToListAsync();

                if (comments == null) return Result<List<CommentDTO>>.Failure("Empty");

                return Result<List<CommentDTO>>.Success(comments);



            }
        }

    }
}
