using Confluent.Kafka;
using Confluent.Kafka.Admin;
using Microsoft.Extensions.Hosting;

namespace backend.Services;

public class KafkaConsumerService : BackgroundService
{
    private readonly string _bootstrapServers;
    private readonly string _topic;
    private readonly string _groupId;
    private readonly Func<string, Task> _handler;

    public KafkaConsumerService(string bootstrapServers, string topic, string groupId, Func<string, Task> handler)
    {
        _bootstrapServers = bootstrapServers;
        _topic = topic;
        _groupId = groupId;
        _handler = handler;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var config = new ConsumerConfig
        {
            BootstrapServers = _bootstrapServers,
            GroupId = _groupId,
            AutoOffsetReset = AutoOffsetReset.Earliest,
            EnableAutoCommit = true
        };

        using var adminClient = new AdminClientBuilder(new AdminClientConfig { BootstrapServers = _bootstrapServers }).Build();

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await adminClient.CreateTopicsAsync(new TopicSpecification[]
                {
                    new TopicSpecification { Name = _topic, NumPartitions = 1, ReplicationFactor = 1 }
                });

                Console.WriteLine($"[Kafka] Topic '{_topic}' is ensured.");
                break;
            }
            catch (CreateTopicsException e) when (e.Results[0].Error.Code == ErrorCode.TopicAlreadyExists)
            {
                Console.WriteLine($"[Kafka] Topic '{_topic}' already exists.");
                break;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[Kafka] Kafka not available yet: {ex.Message}. Retrying in 5s...");
                await Task.Delay(5000, stoppingToken);
            }
        }

        using var consumer = new ConsumerBuilder<Ignore, string>(config).Build();
        consumer.Subscribe(_topic);

        Console.WriteLine($"[Kafka] Subscribed to topic: {_topic}");

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                var result = consumer.Consume(stoppingToken);
                Console.WriteLine($"[Kafka] Message on '{_topic}': {result.Message.Value}");
                await _handler(result.Message.Value);
            }
            catch (ConsumeException ex)
            {
                Console.WriteLine($"[Kafka] Consume error: {ex.Error.Reason}");
            }
            catch (OperationCanceledException)
            {
                break;
            }
        }

        consumer.Close();
    }
}
