using API.Services;
using AspNetCoreRateLimit;

var builder = WebApplication.CreateBuilder(args);

//Load email credentials securely
var smtpServer = Environment.GetEnvironmentVariable("SMTP_SERVER") ?? "smtp.gmail.com";
var smtpPortStr = Environment.GetEnvironmentVariable("SMTP_PORT") ?? "587";

if (!int.TryParse(smtpPortStr, out int smtpPort))
{
    throw new InvalidOperationException("Invalid SMTP_PORT value. It must be an integer.");
}
var smtpEmail = Environment.GetEnvironmentVariable("SMTP_EMAIL") ?? "";
var smtpPassword = Environment.GetEnvironmentVariable("SMTP_PASSWORD") ?? "";

// checking if credentials are not missing in production
if (string.IsNullOrEmpty(smtpEmail) || string.IsNullOrEmpty(smtpPassword))
{
    throw new InvalidOperationException("SMTP credentials are missing. Set the required environment variables.");
}

//Kestral configuration for Render
var port = Environment.GetEnvironmentVariable("PORT") ?? "10000";
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ListenAnyIP(int.Parse(port));
});

//logging for Render debugging
var logger = LoggerFactory.Create(builder => builder.AddConsole()).CreateLogger("App");
logger.LogInformation("API is starting...");
logger.LogInformation("SMTP Server: {smtpServer}", smtpServer);
logger.LogInformation("SMTP Port: {smtpPort}", smtpPort);
logger.LogInformation("SMTP Email: {smtpEmail}", smtpEmail);
logger.LogInformation("SMTP Password is set: {isPasswordSet}", !string.IsNullOrEmpty(smtpPassword));

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins("http://localhost:4200", "https://localhost:4200", "https://rashmi3112.github.io")
            .AllowAnyMethod()
            .AllowAnyHeader());
});

builder.Services.AddControllers();
builder.Services.AddSingleton<EmailService>();
builder.Services.AddMemoryCache();
builder.Services.Configure<IpRateLimitOptions>(options=>
{
    options.GeneralRules = new List<RateLimitRule>
    {
        new RateLimitRule
        {
            Endpoint = "POST:/api/contact/sendmail",
            Limit = 5,
            Period = "1m"
        }
    };
});
builder.Services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();
builder.Services.AddInMemoryRateLimiting();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//Middleware
app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseAuthorization();
app.UseIpRateLimiting();
app.MapControllers();

//logger
logger.LogInformation("API is running on port {port}", port);

app.Run();
