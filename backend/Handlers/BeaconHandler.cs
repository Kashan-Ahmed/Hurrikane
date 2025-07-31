// Handlers/BeaconHandler.cs
using AutoMapper;
using backend.Dtos;
using backend.Hubs;
using backend.Models;
using Microsoft.AspNetCore.SignalR;
using System.Net;

namespace backend.Handlers;

public class BeaconHandler
{
    private readonly AppDbContext _db;
    private readonly IHubContext<BeaconHub> _hub;
    private readonly IMapper _mapper;

    public BeaconHandler(AppDbContext db, IHubContext<BeaconHub> hub, IMapper mapper)
    {
        _db = db;
        _hub = hub;
        _mapper = mapper;
    }

    public async Task Handle(string message)
    {
        try
        {
            var header = message.Substring(0, 35);
            var data = message.Substring(35);
            var parsed = ProcessBeaconHeader(header);

            var beacon = new Beacon
            {
                BeaconID = parsed["BeaconID"].ToString(),
                PlantID = int.Parse(parsed["PlantID"].ToString()!),
                MachNo = int.Parse(parsed["MachNo"].ToString()!),
                MachIP = ParseCleanIP(parsed["MachIP"].ToString()!),
                Version = parsed["Version"].ToString(),
                Active = int.Parse(parsed["Active"].ToString()!),
                ShiftCode = parsed["ShiftCode"].ToString(),
                Event = int.Parse(parsed["Event"].ToString()!),
                LifeTime = int.Parse(parsed["LifeTime"].ToString()!),
                Length = int.Parse(parsed["Length"].ToString()!),
                Created = DateTime.UtcNow,
                Modified = DateTime.UtcNow
            };

            var beaconDto = _mapper.Map<BeaconDto>(beacon);
            await _hub.Clients.All.SendAsync("BeaconReceived", beaconDto);

            _db.Beacons.Add(beacon);
            await _db.SaveChangesAsync();

            Console.WriteLine("✅ Beacon saved to DB.");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ [BeaconHandler] Error: {ex.Message}");
        }
    }

    private Dictionary<string, object> ProcessBeaconHeader(string input)
    {
        return new Dictionary<string, object>
        {
            { "BeaconID", input[0].ToString() },
            { "PlantID", input[1].ToString() },
            { "MachNo", int.Parse(input.Substring(2, 4)) },
            { "MachIP", input.Substring(6, 15) },
            { "Version", input.Substring(21, 2) },
            { "Active", input[23].ToString() },
            { "ShiftCode", int.Parse(input.Substring(24, 5)) },
            { "Event", input[30].ToString() },
            { "LifeTime", int.Parse(input.Substring(30, 2)) },
            { "Length", int.Parse(input.Substring(32, 3)) },
        };
    }

    private IPAddress ParseCleanIP(string ip)
    {
        var parts = ip.Split('.');
        if (parts.Length != 4)
            throw new FormatException("Invalid IP format");

        var cleanParts = parts.Select(p => int.Parse(p).ToString());
        var cleanIP = string.Join('.', cleanParts);
        return IPAddress.Parse(cleanIP);
    }
}
