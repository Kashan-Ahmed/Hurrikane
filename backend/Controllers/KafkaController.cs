using Microsoft.AspNetCore.Mvc;
using backend.Services;
using System.Text.RegularExpressions;

namespace backend.Controllers;

[ApiController]
[Route("api/kafka")]
public class KafkaController : ControllerBase
{
    private readonly KafkaService _kafka;

    public KafkaController(KafkaService kafka)
    {
        _kafka = kafka;
    }

    [HttpPost]
    public async Task<IActionResult> SendToTopic([FromBody] string message)
    {
        string cleanedMessage = Regex.Replace(message, @"[\x00-\x1F]", "");
        if (string.IsNullOrWhiteSpace(cleanedMessage))
        {
            return BadRequest("Message is empty or contains invalid characters.");
        }
        
        string targetTopic;

        switch (cleanedMessage[0])
        {
            case 'O':
                targetTopic = "stopBeacon";
                break;
            case 'S':
                targetTopic = "statusBeacon";
                break;
            default:
                targetTopic = "beacon";
                break;

        }
        await _kafka.SendAsync(targetTopic, cleanedMessage);
        return Ok($"Sent to topic ({targetTopic}) : {cleanedMessage}");
    }
}
