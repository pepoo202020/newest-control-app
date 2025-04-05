'use client'
import CustomBreadcrumb from '@/components/dashboard/shared/custom-breadcrumb'
import { Level, Class } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import Loading from '@/components/shared/loading'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { getHighPriorityLevel, setLevelStyle } from '@/utils/levets-utils'
import { cn } from '@/lib/utils'

interface LevelWithClasses extends Level {
  classes: Class[]
}

export default function LevelsPage() {
  const [levels, setLevels] = useState<LevelWithClasses[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [sort, setSort] = useState<'asc' | 'desc' | string>('')

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/levels/all')
        const data = await response.json()
        setLevels(data)
      } catch (error) {
        console.error('Error fetching levels:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchLevels()
  }, [])

  const levelsWithPriority = levels.map((level) => ({
    ...level,
    priority: getHighPriorityLevel(level.name)
  })).sort((a, b) => a.priority - b.priority)

  console.log(levelsWithPriority)

  // filter levels by ascending order in classes number
  const sortedLevels = sort ? levelsWithPriority.sort((a, b) => {
    if (sort === 'asc') {
      return a.classes.length - b.classes.length
    } else {
      return b.classes.length - a.classes.length
    }
  }) : levelsWithPriority


  if (isLoading || !levels) {
    return <Loading />
  }



  return (
    <div className='flex flex-col gap-4'>
      <CustomBreadcrumb>
        <Select
          value={sort}
          onValueChange={(value) => setSort(value as 'asc' | 'desc')}
        >
          <SelectTrigger>
            <SelectValue placeholder='ترتيب بعدد الفصول' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='asc'>تصاعدي</SelectItem>
            <SelectItem value='desc'>تنازلي</SelectItem>
          </SelectContent>
        </Select>

      </CustomBreadcrumb>
      <div className='px-4 min-h-[calc(100vh-17rem)] p-2 h-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 lg:grid-rows-3 xl:grid-cols-8 gap-5 flex-1 '>
        {sortedLevels.map((level) => (
          <Card key={level.id} className={cn('group relative overflow-hidden transition-all duration-300', 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm', ' h-fit cursor-pointer hover:shadow-lg hover:scale-[1.02]',
            `border  border-${setLevelStyle(level.priority)}`
          )}>
            <CardHeader>
              <CardTitle>{level.name}</CardTitle>
              <CardDescription>{level.classes.length} classes</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{level.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
