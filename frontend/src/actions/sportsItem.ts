'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function createSportsItem(form: FormData) {
    const res = await api('POST', '/sportArticle', { data: form })

    if (res.error) {
        revalidatePath('./admin/artigos-esportivos')
    }

    return JSON.stringify(res)
}

export async function updateSportsItem(form: FormData) {
    const id = form.get('id') as string
    const res = await api('POST', `/sportArticle/${id}`, { data: form })

    if (res.error) {
        revalidatePath('./admin/artigos-esportivos')
    }

    return JSON.stringify(res)
}

export async function destroySportsItem(id: string) {
    const res = await api('DELETE', `/sportArticle/${id}`)
    if (res.error) {
        revalidatePath('./admin/artigos-esportivos')
    }

    return JSON.stringify(res)
}
export async function buyProductAction(id: string) {
    const { response, error } = await api<{ new_amount: number }>('POST', `/sportArticle/${id}/buy`)

    if (response) {
        revalidatePath('/')
        return { success: true, new_amount: response.new_amount }
    }
    return { error: error?.message || "Erro ao comprar" }
}
