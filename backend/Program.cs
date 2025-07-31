using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Services;
using backend.Handlers;
using backend.Hubs;

var builder = WebApplication.CreateBuilder(args);

DotNetEnv.Env.Load();

var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";

builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ListenAnyIP(int.Parse(port));
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var envConnectionString = $"Host={Environment.GetEnvironmentVariable("POSTGRES_HOST")};" +
                          $"Database={Environment.GetEnvironmentVariable("POSTGRES_DB")};" +
                          $"Username={Environment.GetEnvironmentVariable("POSTGRES_USER")};" +
                          $"Password={Environment.GetEnvironmentVariable("POSTGRES_PASSWORD")}";

var connectionString = !string.IsNullOrWhiteSpace(Environment.GetEnvironmentVariable("POSTGRES_HOST"))
    ? envConnectionString
    : builder.Configuration.GetConnectionString("Postgres");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddSignalR();

var kafkaHost = Environment.GetEnvironmentVariable("KAFKA_BOOTSTRAP_SERVERS") ?? "localhost:9092";

builder.Services.AddSingleton(new KafkaService(kafkaHost));

builder.Services.AddScoped<BeaconHandler>();

builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddSingleton<IHostedService>(sp =>
{
    var scope = sp.CreateScope();
    var handler = scope.ServiceProvider.GetRequiredService<BeaconHandler>();
    return new KafkaConsumerService(kafkaHost, "beacon", "groupBeacon", handler.Handle);
});

builder.Services.AddSingleton<IHostedService>(sp =>
    new KafkaConsumerService(kafkaHost, "stopBeacon", "groupStopBeacon", async (msg) =>
    {
        Console.WriteLine($"[Stop Beacon Handler] Received: {msg}");
        await Task.CompletedTask;
    }));

builder.Services.AddSingleton<IHostedService>(sp =>
    new KafkaConsumerService(kafkaHost, "statusBeacon", "groupStatusBeacon", async (msg) =>
    {
        Console.WriteLine($"[Status Beacon Handler] Received: {msg}");
        await Task.CompletedTask;
    }));

var allowedOrigin = Environment.GetEnvironmentVariable("FRONTEND_URL") ?? "http://localhost:3000";

builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactCors", policy =>
    {
        policy
            .WithOrigins(allowedOrigin)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials(); 
    });
});


var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

// Swagger
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
});

app.UseCors("ReactCors");

app.MapControllers();
app.MapHub<BeaconHub>("/beaconHub");
app.UseHttpsRedirection();
app.Run();
