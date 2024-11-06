import cors from 'cors'
import express from 'express'
import { Resend } from 'resend'

const app = express()
const port = 3000

// Middleware para parsear JSON
app.use(cors())

app.use(express.json())

app.post('/send-email', async (req, res) => {
  const resend = new Resend('re_Tc4oL2Eo_9gvGUXDPan57RCDRvZ7VdJ1W')

  const { from, to, subject, html } = req.body

  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: 'goekoapp@gmail.com',
      subject: subject || 'Hello World',
      html: '<strong>It works!</strong>',
    })

    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to send email' })
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
