"use client"
import { contact } from "@/app/actions/contact";
import { useEffect, useRef } from "react";
import { useFormState } from 'react-dom';
import { useFormStatus } from "react-dom";

const ContactForm = () => {
  const [state, formAction] = useFormState(contact, {})
  const formRef = useRef(null)

  useEffect(() => {
    if (state?.code == 200) formRef.current.reset()
  }, [state])

  return (
    <form ref={formRef} action={formAction} className="px-4 md:px-16">
      <div className="mb-[2rem] flex flex-col">
        <label className="text-[1.5rem] md:text-[1rem]" htmlFor="name">Nom</label>
        <input className="text-[2rem] md:text-[1.125rem] pt-2 pb-1 bg-transparent border-b-2 outline-none border-b-primary" type="text" id="name" name="name" />
        <span className="md:text-[0.8rem]">{state?.formatError?.name?.map((e) => e)}</span>
      </div>
      <div className="mb-[2rem] flex flex-col">
        <label className="text-[1.5rem] md:text-[1rem]" htmlFor="email">Email</label>
        <input className="text-[2rem] md:text-[1.125rem] pt-2 pb-1 bg-transparent border-b-2 outline-none border-b-primary" type="text" id="email" name="email" />
        <span className="md:text-[0.8rem]">{state?.formatError?.email?.map((e) => e)}</span>
      </div>
      <div className="mb-[2rem] flex flex-col">
        <label className="text-[1.5rem] md:text-[1rem]" htmlFor="message">Message</label>
        <textarea rows={4} type="text" id="message" name="message" className="min-h-28 max-h-72 text-[2rem] md:text-[1.125rem] pt-2 pb-1 bg-transparent border-b-2 outline-none border-b-primary" />
        <span className="md:text-[0.8rem]">{state?.formatError?.message?.map((e) => e)}</span>
      </div>
      <Submit state={state} />
    </form>
  );
}

const Submit = ({ state }) => {
  const { pending } = useFormStatus()

  return (
    <div className="flex flex-col items-center mt-16 md:flex-row">
      <button 
        className="rounded-[3.75rem] bg-primary px-[2rem] py-[0.75rem] text-secondary uppercase"
        type="submit" 
        aria-disabled={pending}
      >
        <span className="text-[2rem] md:text-[1.125rem] text-center block min-w-[12.0625rem] w-full">
          { pending ? '...' : 'Envoyer'}
        </span>
      </button>
      <span className="md:ml-16 md:mt-0 mt-8 md:text-[0.8rem]">
        { state?.message ?? state?.error }
      </span>
    </div>
  )
}

export default ContactForm