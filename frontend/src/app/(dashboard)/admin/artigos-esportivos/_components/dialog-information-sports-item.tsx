'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsSportsItem from './form-fields-sports-item'
import { sportsItemType } from '@/types/sportsItem'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { sportArticleType } from '@/types/sportArticle'

interface DialogInformationSportsItemProps {
  id: string
  children: React.ReactNode
  isInformation?: boolean
}

export function DialogInformationSportsItem({
  id,
  children,
}: DialogInformationSportsItemProps) {
  const [sportArticle, setSportArticle] = useState<sportArticleType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()

  useEffect(() => {
    if (!open) return 
    setSportArticle(null)
    const requestData = async () => {
      const { response } = await api('GET', `sportArticle/${id}`)

      if (response) {
        setSportArticle(response as sportArticleType)
      } else {
        setSportArticle(null)
        toast({
          title: 'Artigo esportivo não encontrado!',
        })
        setOpen(false)
      }
    }

    requestData()

    return () => setSportArticle(null)
  }, [id, open, toast])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações do artigo esportivo</DialogTitle>
          <DialogDescription>
            Visualize as informações detalhadas do artigo esportivo abaixo.
          </DialogDescription>
        </DialogHeader>
        <FormFieldsSportsItem sportArticle={sportArticle} readOnly />
      </DialogContent>
    </Dialog>
  )
}
