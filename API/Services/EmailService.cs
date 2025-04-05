using API.Models;
using MailKit.Net.Smtp;
using MimeKit;

namespace API.Services;

public class EmailService
{
    public async Task<bool> SendEmailAsync(ContactModel contactModel)
    {
        //loading from environment
        var smtpServer = Environment.GetEnvironmentVariable("SMTP_SERVER") ?? "smtp.gmail.com";
        var smtpPortStr = Environment.GetEnvironmentVariable("SMTP_PORT") ?? "587";
        var smtpEmail = Environment.GetEnvironmentVariable("SMTP_EMAIL");
        var smtpPassword = Environment.GetEnvironmentVariable("SMTP_PASSWORD");

        if (string.IsNullOrWhiteSpace(smtpEmail) || string.IsNullOrWhiteSpace(smtpPassword))
            return false;

        if (!int.TryParse(smtpPortStr, out int smtpPort))
            smtpPort = 587;

        var email = new MimeMessage();
        email.From.Add(new MailboxAddress("Rashmi Unhale", smtpEmail));
        email.To.Add(new MailboxAddress("Rashmi Unhale", smtpEmail));
        email.Subject = "New Contact Form Submission";

        email.Body = new TextPart("plain")
        {
            Text = $"Name: {contactModel.Name}\nEmail: {contactModel.Email}\nMessage: {contactModel.Message}"
        };

        using var smtp = new SmtpClient();
        try
        {
            await smtp.ConnectAsync(smtpServer, smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync(smtpEmail, smtpPassword);
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Failed to send the mail: {ex.Message}");
            return false;
        }
    }
}
