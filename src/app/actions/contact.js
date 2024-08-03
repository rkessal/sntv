import { z } from "zod"

export async function contact(prevState, formData) {
  const name = formData.get('name') ?? ''
  const email = formData.get('email') ?? ''
  const m = formData.get('message') ?? ''

  const schema = z.object({
    name: z.string().min(1, { message:  'Le nom est obligatoire.'}),
    email: z.string().min(1, { message: 'L\'email est obligatoire.'}).email("Merci de renseigner un email valide."),
    message: z.string().min(10, { message:  'Le message doit faire au moins 10 caractères.'})
  })

  const payload = {
    name,
    email,
    message: m
  }

  const parse = schema.safeParse(payload)
  if (parse.error) {
    return {
      code: 400,
      formatError: parse.error.flatten().fieldErrors
    } 
  } 

  const headers = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  };

  const response = await fetch('/api/contact', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload) 
  })

  return {
    ...(await response.json())
  }
  
}