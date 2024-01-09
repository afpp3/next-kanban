'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import { useLocalStorage } from 'usehooks-ts'
import { useOrganization, useOrganizationList } from '@clerk/nextjs'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Accordion } from '@/components/ui/accordion'

import { NavItem, Organization } from './nav-item'

interface SidebarProps {
  storageKey?: string
}

export function Sidebar({
  storageKey = '@trello-sidebar-state',
}: SidebarProps) {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  )

  const activeOrganization = useOrganization()
  const organizationList = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  })

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key)
      }

      return acc
    },
    []
  )

  const onExpand = (id: string) => {
    setExpanded((currentValue) => ({
      ...currentValue,
      [id]: !expanded[id],
    }))
  }

  if (
    !activeOrganization.isLoaded ||
    !organizationList.isLoaded ||
    organizationList.userMemberships.isLoading
  ) {
    return (
      <>
        <Skeleton />
      </>
    )
  }

  return (
    <>
      <div className="mb-1 flex items-center text-xs font-medium">
        <span className="pl-4">Workspaces</span>

        <Button
          asChild
          type="button"
          size="icon"
          variant="ghost"
          className="ml-auto"
        >
          <Link href="/select-org">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      >
        {organizationList.userMemberships.data.map(({ organization }) => (
          <NavItem
            key={organization.id}
            isActive={activeOrganization?.organization?.id === organization.id}
            isExpanded={expanded[organization.id]}
            organization={organization as Organization}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </>
  )
}
