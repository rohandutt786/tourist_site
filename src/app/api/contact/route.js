import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, date, destination, persons, message } = body;

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASS,
      },
    });

    // Mail options
    await transporter.sendMail({
      from: `"Namoh Tourism" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "New Tour Inquiry – Namoh Tourism",
      html: `
  <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 30px;">
    <table width="100%" max-width="600px" align="center" cellpadding="0" cellspacing="0" 
      style="background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <tr>
        <td style="background-color: #003566; padding: 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0;">Namoh Tourism</h1>
          <p style="color: #dcdcdc; margin: 5px 0 0;">New Tour Inquiry Received</p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding: 25px;">
          <h2 style="margin-top: 0; color: #003566;">Customer Details</h2>

          <table width="100%" cellpadding="8" cellspacing="0" 
            style="border-collapse: collapse; margin-top: 15px;">
            
            <tr style="background-color: #f9fafb;">
              <td><strong>Name:</strong></td>
              <td>${name}</td>
            </tr>

            <tr>
              <td><strong>Email:</strong></td>
              <td>${email}</td>
            </tr>

            <tr style="background-color: #f9fafb;">
              <td><strong>Phone:</strong></td>
              <td>${phone}</td>
            </tr>

            <tr>
              <td><strong>Travel Date:</strong></td>
              <td>${date}</td>
            </tr>

            <tr style="background-color: #f9fafb;">
              <td><strong>Destination:</strong></td>
              <td>${destination}</td>
            </tr>

            <tr>
              <td><strong>Number of Persons:</strong></td>
              <td>${persons}</td>
            </tr>

          </table>

          <h3 style="margin-top: 25px; color: #003566;">Message</h3>
          <p style="background: #f4f6f8; padding: 15px; border-radius: 6px;">
            ${message}
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #777;">
          © ${new Date().getFullYear()} Namoh Tourism | All Rights Reserved
        </td>
      </tr>

    </table>
  </div>
  `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false }, { status: 500 });
  }
}
