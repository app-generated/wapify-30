import React from 'react'
import { clsx } from 'clsx'

interface CardProps {
  className?: string
  children: React.ReactNode
}

interface CardContentProps {
  className?: string
  children?: React.ReactNode
}

export const Card: React.FC<CardProps> = ({ className, children }) => {
  return (
    <div className={clsx('rounded-lg border bg-card text-card-foreground shadow-sm', className)}>
      {children}
    </div>
  )
}

export const CardContent: React.FC<CardContentProps> = ({ className, children }) => {
  return (
    <div className={clsx('p-6 pt-0', className)}>
      {children}
    </div>
  )
}