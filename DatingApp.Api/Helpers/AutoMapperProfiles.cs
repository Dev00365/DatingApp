using System.Linq;
using AutoMapper;
using DatingApp.Api.Dto;
using DatingApp.Api.Models;

namespace DatingApp.Api.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForDetailDto>()
            .ForMember( dest => dest.PhotoUrl , opt => {
                opt.MapFrom(src =>  src.Photos.FirstOrDefault(p => p.IsMain).Url);
            }
             ).ForMember( dest => dest.Age , opt =>{
                 opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
             });
            
            CreateMap<User, UserListDto>().
            ForMember( dest => dest.PhotoUrl , opt => {
                opt.MapFrom(src =>  src.Photos.FirstOrDefault(p => p.IsMain).Url);
            }
             ).ForMember( dest => dest.Age , opt =>{
                 opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
             });
            CreateMap<Photo,PhotosForDetailDto>();

            CreateMap<UserUpdateDto , User>();
        }
    }
}