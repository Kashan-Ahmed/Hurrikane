using Confluent.Kafka;

namespace backend.Services;

public class KafkaService
{
    private readonly IProducer<Null, string> _producer;

    public KafkaService(string bootstrapServers)
    {
        var config = new ProducerConfig
        {
            BootstrapServers = bootstrapServers
        };

        _producer = new ProducerBuilder<Null, string>(config).Build();
    }

    public async Task SendAsync(string topic, string message)
    {
        var msg = new Message<Null, string> { Value = message };
        await _producer.ProduceAsync(topic, msg);
    }
}
