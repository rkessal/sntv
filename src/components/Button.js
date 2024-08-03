import { PrismicNextLink } from '@prismicio/next'
import clsx from 'clsx'
import React from 'react'

const Button = ({ ref, label, link, onClick, variant, size, className }) => {
  const classNameWrapper = clsx(
    'rounded-full  uppercase border-[1px]',
    variant === 'primary' && 'bg-primary text-secondary border-secondary',
    variant === 'secondary' && 'bg-secondary text-primary  border-primary',
    size === 'small' ? 'px-[2rem] py-[0.25rem]' : 'px-[2.5rem] py-[0.75rem]',
    className
  )
  const classNameChild = 'text-[2rem] md:text-[1.125rem] text-center block min-w-[12.0625rem] w-full'

  if (onClick) {
    return (
      <button ref={ref} onClick={onClick} className={classNameWrapper} >
        <span className={classNameChild}>
          {label}
        </span>
      </button>
    )
  }

  return (
    <PrismicNextLink
      ref={ref}
      className={classNameWrapper}
      href={link}
    >
      <span className={classNameChild}>
        {label}
      </span>
    </PrismicNextLink>
  )
}

export default Button