import CustomBreadcrumb from '@/components/dashboard/shared/custom-breadcrumb'
import React from 'react'

export default function LevelsPage() {
  return (
    <div className='flex flex-col gap-4'>
        <CustomBreadcrumb>
            filter
        </CustomBreadcrumb>
        <div className='flex-1 px-4 border-2 min-h-[calc(100vh-17rem)]'>LevelsPage</div>
    </div>
  )
}
