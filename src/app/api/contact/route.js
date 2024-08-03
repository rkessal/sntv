// import nodemailer from "nodemailer";
import { NextResponse } from 'next/server'
import { sendMail } from '@/app/lib/nodemailer'
 
export async function POST(request) {
  const body = await request.json()
  const { email, name, message } = body
  try {
    await sendMail({ name, email, message})
  } catch (error) {
    console.log("ERROR : ", error)
    return NextResponse.json({ error: 'Une erreur s\'est produite. Réessayez plus tard.', code: 500 })
  }

  return NextResponse.json({ message: 'Votre message a bien été envoyé.', code: 200 })
}