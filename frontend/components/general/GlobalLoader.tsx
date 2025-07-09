"use client"

import { Loader } from 'lucide-react'
import { useIsFetching, useIsMutating } from '@tanstack/react-query'

export const GlobalLoader = () => {
  const isFetching = useIsFetching()
  const isMutating = useIsMutating()

  const loading = isFetching > 0 || isMutating > 0

  if (!loading) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/20 backdrop-blur-xs z-[100]">
      <Loader className="animate-spin text-black w-10 h-10" />
    </div>
  )
}
