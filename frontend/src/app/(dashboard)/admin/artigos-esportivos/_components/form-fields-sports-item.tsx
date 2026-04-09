'use client'

import { Button } from '@/components/button'
import {
  FormFieldsGroup,
  FormField,
  ImageForm,
  handleImageChange,
} from '@/components/dashboard/form'
import { DialogFooter } from '@/components/dialog'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { cn } from '@/lib/utils'
import { api, ResponseErrorType } from '@/services/api'
import { categoryType } from '@/types/category'
import { sportArticleType } from '@/types/sportArticle'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/select' 
import { Instrument_Sans } from 'next/font/google'
import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'

interface FormFieldsSportArticleProps {
  sportArticle?: sportArticleType | null
  readOnly?: boolean
  error?: ResponseErrorType | null
}

export default function FormFieldsSportArticle({
  sportArticle,
  readOnly,
  error,
}: FormFieldsSportArticleProps) {
  const { pending } = useFormStatus()
  const [updateImage, setUpdateImage] = useState<string | undefined>()
  const [categories, setCategories ] = useState <categoryType[]>([])
  const [selectedCategory, setSelectedCategory] = useState <categoryType | null>(
    sportArticle?.category ?? null,
  )
  useEffect(() => {
    if (sportArticle?.category) {
      setSelectedCategory(sportArticle.category)
    }
  }, [sportArticle])
  useEffect (() => {
    async function getCategories() {
        const {response, error} = await api ('GET', '/category')
  
        if (response){
            setCategories(response as categoryType[])
        } else {
            console.error(error?.message)
        }
    }
  
    getCategories()
    }, [])
  
  return (
    <>
      <FormFieldsGroup>
        {sportArticle && <Input defaultValue={sportArticle.id} type="text" name="id" hidden />}
        <FormField>
        <Label htmlFor = "image" required = {!sportArticle}>
          Imagem
          </Label>
          <Input
            name="image"
            id="image"
            type="file"
            accept="image/*"
            disabled={pending}
            hidden={readOnly}
            onChange={(e) => handleImageChange(e, setUpdateImage)}
            error={error?.errors?.image}
          />
          <ImageForm
            className="aspect-square size-40"
            src={updateImage || sportArticle?.image}
          />
        </FormField>
                <FormField>
          <Label htmlFor="name" required={!sportArticle}>
            Nome
          </Label>
          <Input
            name="name"
            id="name"
            placeholder="Insira nome do artigo esportivo"
            defaultValue={sportArticle?.name}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.name}
          />
        </FormField>
        <FormField>
          <Label htmlFor="brand" required={!sportArticle}>
            Marca
          </Label>
          <Input
            name="brand"
            id="brand"
            placeholder="Insira marca do artigo esportivo"
            defaultValue={sportArticle?.brand}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.brand}
          />
        </FormField>
        <FormField>
          <Label htmlFor="price" required={!sportArticle}>
            Preço
          </Label>
          <Input
            name="price"
            id="price"
            placeholder="Insira preço do artigo esportivo"
            defaultValue={sportArticle?.price}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.price}
            type="number"
            step="0.01"
            min="0"
            inputMode="decimal"
          />
        </FormField>
        <FormField>
          <Label htmlFor="year" required={!sportArticle}>
            Ano
          </Label>
          <Input
            name="year"
            id="year"
            maxLength={4}
            placeholder="Insira o ano do artigo esportivo"
            defaultValue={sportArticle?.year}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.year}
            type="number"
            min={1900}
            max={2100}
          />
        </FormField>
        <FormField>
          <Label htmlFor="category_id" required={!sportArticle}>
            Categoria
          </Label>
        <Input
          id="category_id"
          name="category_id"
          type="hidden"
          value={selectedCategory?.id ? String(selectedCategory.id) : undefined}
        />
        <Select
          value={selectedCategory?.id ? String(selectedCategory.id) : undefined}
          onValueChange={(value) => setSelectedCategory(categories?.find((category) => String(category.id) === value) || null)}
          disabled={pending || readOnly}
        >
          <SelectTrigger id="category_id_select" className="col-span-3">
            <SelectValue placeholder="Selecione uma categoria"/>
          </SelectTrigger>
          <SelectContent>
            {categories?.map((category) => (
              <SelectItem key={category.id} value={String(category.id)}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {error?.errors?.category_id && (
          <p className="text-destructive text-xs mt-2 col-start-2 col-end-5">
            {error.errors.category_id}
          </p>
        )}
      </FormField>
              <FormField>
          <Label htmlFor="amount" required={!sportArticle}>
            Estoque
          </Label>
          <Input
            name="amount"
            id="amount"
            placeholder="Insira quantidade do artigo esportivo no estoque"
            defaultValue={sportArticle?.amount}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.amount}
            type="number"
            min="0"
          />
        </FormField>
      </FormFieldsGroup>
      <DialogFooter className={cn({ hidden: readOnly })}>
        <Button type="submit" pending={pending}>
          Salvar
        </Button>
      </DialogFooter>
    </>
  )
}