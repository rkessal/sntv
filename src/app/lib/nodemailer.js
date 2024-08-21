import nodemailer from 'nodemailer'

const port = process.env.NODEMAILER_PORT
const host = process.env.NODEMAILER_HOST
const user = process.env.NODEMAILER_USER
const pass = process.env.NODEMAILER_PASS
const target = process.env.NODEMAILER_TARGET

function createTransport() {
  return nodemailer.createTransport({
    port,
    host,
    auth: {
      user,
      pass,
    }
  })
}

async function sendMail({ name, email, message }) {
  const transporter = createTransport()

  await transporter.sendMail({
    from: user,
    to: target,
    replyTo: email,
    subject: 'SNTV : Nouveau message',
    text: `Message de ${name} :
    ${message}
    Contact : ${email}
    `,
    html: `<p>Message de ${name}</p>
    <p>${message}</p>
    <p>Contact : ${email}</p>`
  })
}

export {
  sendMail
}