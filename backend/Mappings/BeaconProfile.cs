using AutoMapper;
using backend.Models;
using backend.Dtos;

namespace backend.Mappings
{
    public class BeaconProfile : Profile
    {
        public BeaconProfile()
        {
            CreateMap<Beacon, BeaconDto>()
                .ForMember(dest => dest.MachIP, opt => opt.MapFrom(src => src.MachIP.ToString()));
        }
    }
}
