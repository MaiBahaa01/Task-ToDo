using AutoMapper;
using TodoApi.DTOs;
using TodoApi.Model;

namespace TodoApi.Mappings
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            // Mapping for GET operations
            CreateMap<Todo, TodoReadDto>().ReverseMap();

            // Mapping for POST and PUT operations
            CreateMap<TodoCreateOrUpdateDto, Todo>()
                .ForMember(dest => dest.Id, opt => opt.Ignore());
            // Mapping for PATCH operations
            CreateMap<TodoUpdatePatchDto, Todo>()
               .ForMember(dest => dest.Id, opt => opt.Ignore())
               .ForMember(dest => dest.Title, opt => opt.Condition(src => src.Title != null))
               .ForMember(dest => dest.Completed, opt => opt.Condition(src => src.Completed.HasValue));
        }
    }
}
