const forgotPasswordTemplate = (name, email,token) => {
    return `<div>
                  <h1>Hello ${name}, </h1>
                  <hr/>

                  <h3>A request has been received to change the password for your JOB API Account.</h3>

                  <div style="margin:auto;text-align:center" >
                        <a style="padding:14px 16px;width:100%;background:teal;color:#fff;" href="http://localhost:3000/generate/password/${token}">Reset Password</a>
                  </div>

                  <hr/>
                  <p>
                        If you did not initiate this request, please contact us immediately at,
                  </p>
                  <p>
                      <u>support@jobapi.com</u>
                  </p>
                  <br/>
                  <br/>
                  <p>Thank You,</p>
                  <p><strong>The JobAPI Team</strong></p>
            </div>`
};

module.exports = forgotPasswordTemplate