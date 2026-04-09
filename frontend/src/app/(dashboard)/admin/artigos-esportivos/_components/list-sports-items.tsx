'use client'
import { DashboardContainer } from '@/components/dashboard/dashboard-items'
import {
  TabbleCellImage,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/dashboard/table'
import { api } from '@/services/api'
import { sportsItemType } from '@/types/sportsItem'
import { Button } from '@/components/button'
import { LuInfo } from "react-icons/lu";
import { LuPen } from "react-icons/lu";
import { LuCirclePlus } from "react-icons/lu";
import { LuTrash } from "react-icons/lu";
import { DialogUpdateSportsItem } from './dialog-update-sports-item'
import { DialogSportsItemDelete } from './dialog-delete-sports-item'
import { DialogInformationSportsItem } from './dialog-information-sports-item'
import { DialogCreateSportsItem } from './dialog-create-sports-item'
import { sportArticleType } from '@/types/sportArticle'
import { useState, useEffect } from 'react'

export default async function ListSportsItems() {
  const [sportArticle, setSportArticle] = useState <sportArticleType[]>([])
  useEffect (() => {
    async function getSportArticle() {
      const {response, error} = await api ('GET', '/sportArticle')
      if (response){
          setSportArticle(response as sportArticleType[])
      } else {
          console.error(error?.message)
      }
    } 

    getSportArticle()
  }, [])

  if (!sportArticle) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter os imóveis.
      </DashboardContainer>
    )
  }


return (
    <>
      <DashboardContainer className="flex h-min justify-between space-x-0 gap-y-2.5 max-sm:flex-col">
        <DialogCreateSportsItem>
          <Button size="sm">
            <LuCirclePlus/>
            Novo artigo esportivo
          </Button>
        </DialogCreateSportsItem>
      </DashboardContainer>
      
      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Ano</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sportArticle.map((sportArticle: sportArticleType) => (
              <TableRow key={sportArticle.id}>
                <TableCell>
                  <TabbleCellImage src={sportArticle.image} />
                </TableCell>
                <TableCell>{sportArticle.price}</TableCell>
                <TableCell>{sportArticle.year}</TableCell>
                <TableCell>{sportArticle.brand}</TableCell>
                <TableCell>{sportArticle.name}</TableCell>
                <TableCell>{sportArticle.amount}</TableCell>
                <TableCell>{sportArticle.category.name}</TableCell>
                
                <TableCell className="flex justify-end gap-2">
                  <DialogInformationSportsItem id={sportArticle.id}>
                    <Button variant="default-inverse" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationSportsItem>
                  <DialogUpdateSportsItem id={sportArticle.id}>
                    <Button variant="secondary-inverse" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateSportsItem>
                  <DialogSportsItemDelete id={sportArticle.id}>
                    <Button variant="destructive-inverse" size="icon">
                      <LuTrash />
                    </Button>
                  </DialogSportsItemDelete>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {sportArticle.length === 0 && (
            <TableCaption>Nenhum artigo esportivo encontrado.</TableCaption>
          )}
        </Table>
      </DashboardContainer>
    </>
  )
}
