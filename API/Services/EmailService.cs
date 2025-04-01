using API.Models;
using MailKit.Net.Smtp;
using MimeKit;

namespace API.Services;

public class EmailService
{
    private readonly IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<bool> SendEmailAsync(ContactModel contactModel)
    {
        var emailSettings = _configuration.GetSection("EmailSettings");

        var portValue = emailSettings["Port"];
        int smtpPort = string.IsNullOrWhiteSpace(portValue) ? 587 : int.Parse(portValue);

        var email = new MimeMessage();
        email.From.Add(new MailboxAddress(emailSettings["SenderName"], emailSettings["SenderEmail"]));
        email.To.Add(new MailboxAddress("Rashmi Unhale",emailSettings["SenderEmail"]));
        email.Subject = "New Contact Form Submission";

        email.Body = new TextPart("plain")
        {
            Text = $"Name: {contactModel.Name}\nEmail: {contactModel.Email}\nMessage: {contactModel.Message}"
        };

        using var smtp = new SmtpClient();
        try
        {
            await smtp.ConnectAsync(emailSettings["SmtpServer"], smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync(emailSettings["SenderEmail"], emailSettings["Password"]);
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
            return true;
        }
        catch
        {
            return false;
        }
    }
}
