import Link from "next/link";
import Image from "next/image"; 
import { sportArticleType } from "@/types/sportArticle";
import styles from './productCard.module.css'
import { useState } from "react";
import { useToast } from "@/components/use-toast";
import { buyProductAction } from "@/actions/sportsItem" 

export default function ProductCard({ sportArticle }: { sportArticle: sportArticleType }) {
const [amount, setAmount] = useState(sportArticle.amount);
    const { toast } = useToast();

    const buy = async () => {
        if (amount <= 0) return;

        const result = await buyProductAction(sportArticle.id);

        if (result.success) {
            setAmount(result.new_amount);
            toast({ title: "Item comprado com sucesso!" });
        } else {
            toast({ title: result.error, variant: "destructive" });
        }
    };
    return (
        <div className={styles.productCard}>
            <Link href={`/product/${sportArticle.id}`} className={styles.productLink}>
                <Image 
                        className={styles.productImage} 
                        src={sportArticle.image} 
                        alt={sportArticle.name}
                        width={300}
                        height={300}
                />
            </Link>
            <h1 className={styles.productName}>{sportArticle.name}</h1>
            <p className={styles.productCategory}>Categoria: {sportArticle.category.name}</p>
            <p className={styles.productBrand}>Marca: {sportArticle.brand}</p>
            <p className={styles.productYear}>Lançamento: {sportArticle.year}</p>
            <p className={styles.productPrice}>R$ {sportArticle.price}</p>
            <p className={styles.productStock}>{amount} em estoque</p>

        {amount > 0 ? (
            <button className={styles.productButton} onClick={buy}>
                Comprar
            </button>) : (<button className={styles.productButton} disabled>Esgotado</button>)
        }
        </div>
    )
}