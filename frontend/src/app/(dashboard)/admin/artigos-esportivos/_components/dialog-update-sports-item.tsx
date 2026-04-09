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
import { updateSportsItem } from '@/actions/sportsItem'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { ResponseErrorType, api } from '@/services/api'
import { sportArticleType } from '@/types/sportArticle'

interface DialogUpdateSportsItemProps {
  id: string
  children: React.ReactNode
}

export function DialogUpdateSportsItem({ id, children }: DialogUpdateSportsItemProps) {
  const [sportArticle, setSportArticle] = useState<sportArticleType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const [error, setError] = useState<ResponseErrorType | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (!open) return 
    setSportArticle(null)
    const requestData = async () => {
      const { response } = await api<sportArticleType>('GET', `/sportArticle/${id}`)

      if (response) {
        setSportArticle(response)
      } else {
        setSportArticle(null)
        toast({
          title: 'Artigo esportivo  não encontrado!',
        })
        setOpen(false)
      }
    }

    requestData()

    return () => {
      setSportArticle(null)
      setError(null)
    }
  }, [id, open, toast])

  const submit = async (form: FormData) => {
    const newForm = await filterFormData(form)

    const { error } = await JSON.parse(await updateSportsItem(newForm))

    if (error) {
      setError(error)
      toast({
        title: 'Não foi possível editar o artigo esportivo!',
      })
    } else {
      toast({
        title: 'Artigo esportivo editado com sucesso!',
      })
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar artigo esportivo</DialogTitle>
          <DialogDescription>
            Atualize as informações do artigo esportivo abaixo e clique em
            &quot;Salvar&quot; para aplicar as alterações.
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <FormFieldsSportsItem error={error} sportArticle={sportArticle} />
        </form>
      </DialogContent>
    </Dialog>
  )
}
