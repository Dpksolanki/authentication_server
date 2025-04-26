export const verificationTokenEmailTemplate = `<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>

  <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Email Verification</div>

  <body style="background-color:#fff;color:#212121">
    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;padding:20px;margin:0 auto;background-color:#eee">
      <tbody>
        <tr style="width:100%">
          <td>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="background-color:#fff">
              <tbody>
                <tr>
                  <td>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="background-color:#252f3d;display:flex;padding:20px 0;align-items:center;justify-content:center">
                      <tbody>
                        <tr>
                          <td><img alt="Logo" height="45" src="https://via.placeholder.com/75x45" style="display:block;outline:none;border:none;text-decoration:none" width="75" /></td>
                        </tr>
                      </tbody>
                    </table>

                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:25px 35px">
                      <tbody>
                        <tr>
                          <td>
                            <h1 style="color:#333;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;font-size:20px;font-weight:bold;margin-bottom:15px">Verify your email address</h1>
                            <p style="font-size:14px;line-height:24px;margin:24px 0;color:#333;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;margin-bottom:14px">
                              Thanks for signing up. Please use the verification code below to complete your registration.
                            </p>
                            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="display:flex;align-items:center;justify-content:center">
                              <tbody>
                                <tr>
                                  <td>
                                    <p style="font-size:16px;line-height:24px;margin:0;color:#333;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;font-weight:bold;text-align:center">
                                      Verification code is:
                                    </p>
                                    <p style="font-size:36px;line-height:24px;margin:10px 0;color:#333;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;font-weight:bold;text-align:center">
                                      {verificationToken}
                                    </p>
                                    <p style="font-size:14px;line-height:24px;margin:0px;color:#333;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;text-align:center">
                                      (This code is valid for 10 minutes)
                                    </p>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <hr style="width:100%;border:none;border-top:1px solid #eaeaea" />

                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:25px 35px">
                      <tbody>
                        <tr>
                          <td>
                            <p style="font-size:14px;line-height:24px;margin:0px;color:#333;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif">
                              If you did not request this, you can safely ignore this email.
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                  </td>
                </tr>
              </tbody>
            </table>

            <p style="font-size:12px;line-height:24px;margin:24px 0;color:#333;font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;padding:0 20px">
              © 2025 CRUD Project. All rights reserved.
            </p>

          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>`;


export const WELCOME_EMAIL_TEMPLATE = `
<html dir="ltr" lang="en">

  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>

  <body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;margin:0 auto;padding:20px 0 48px">
      <tbody>
        <tr style="width:100%">
          <td>
            <h2 style="text-align:center;margin-bottom:16px">Welcome to CRUD Project</h2>
            <p style="font-size:16px;line-height:26px;margin:16px 0">Hi <strong>{name}</strong>,</p>
            <p style="font-size:16px;line-height:26px;margin:16px 0">We're excited to have you on board. Your account is ready, and you can now access all features of the CRUD Project dashboard.</p>

            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="text-align:center">
              <tbody>
                <tr>
                  <td>
                    <a href="http://localhost:3000/login" style="line-height:100%;text-decoration:none;display:block;max-width:100%;background-color:#5F51E8;border-radius:5px;color:#fff;font-size:16px;text-align:center;padding:12px 20px;margin:20px auto;width:fit-content" target="_blank">
                      Login to your account
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>

            <p style="font-size:16px;line-height:26px;margin:16px 0">Cheers,<br />The CRUD Project Team</p>

            <hr style="width:100%;border:none;border-top:1px solid #eaeaea;margin:20px 0" />
            <p style="font-size:12px;line-height:24px;margin:16px 0;color:#8898aa">This is a system-generated email. Please do not reply to it.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </body>

</html>`;
