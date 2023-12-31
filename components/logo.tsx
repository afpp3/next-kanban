import Image from 'next/image'
import Link from 'next/link'
import localFont from 'next/font/local'

import { cn } from '@/lib/utils'

const headingFonts = localFont({
  src: '../public/fonts/font.woff2',
})

export function Logo() {
  return (
    <Link href="/">
      <div className="hidden items-center gap-x-2 transition hover:opacity-75 md:flex">
        <Image src="/logo.svg" alt="Taskify Logo" height={30} width={30} className='w-8 h-8' />
        <p
          className={cn(
            'pb-1 text-lg text-neutral-700',
            headingFonts.className
          )}
        >
          Taskify
        </p>
      </div>
    </Link>
  )
}
