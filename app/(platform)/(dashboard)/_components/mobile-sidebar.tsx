'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { MenuIcon } from 'lucide-react'

import {
  useMobileSidebar,
  useMobileSidebarActions,
} from '@/app/hooks/use-mobile-sidebar'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'

import { Sidebar } from './sidebar'

export function MobileSidebar() {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  const { onOpen, onClose } = useMobileSidebarActions()
  const isOpen = useMobileSidebar()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <Button
        className="mr-2 block md:hidden"
        variant="ghost"
        size="sm"
        onClick={onOpen}
      >
        <MenuIcon className="h-4 w-4" />
      </Button>

      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="p-2 pt-10" side="left">
          <Sidebar storageKey="@trello-sidebar-state-mobile" />
        </SheetContent>
      </Sheet>
    </>
  )
}
