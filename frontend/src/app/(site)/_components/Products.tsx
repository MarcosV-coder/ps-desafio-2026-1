'use client'
import { sportArticleType } from '@/types/sportArticle'
import styles from './products.module.css'
import ProductCard from './ProductCard'
import { useEffect, useState } from 'react'
import { api } from '@/services/api';

export default function Products (){

      const [sportArticle, setSportArticle] = useState <sportArticleType[]>([]);
      
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
    return (
        <section className={styles.products} id="products">
            <div className={styles.container}>
                <h1 className={styles.title}>Nossos Produtos</h1>
                <div className={styles.productsList}>
                    {sportArticle.map((sportArticle) => (
                        <ProductCard key={sportArticle.id} sportArticle={sportArticle} />
                    ))}
                </div>
            </div>
        </section>
    )
}