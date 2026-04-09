import { api } from "@/services/api";
import styles from "./promotion.module.css"; 
import Filter from "../_components/Filter";


export default async function PromotionPage() {

  const { response: sportArticleResponse } = await api<any>('GET', '/sportArticle');
  const { response: categoryResponse } = await api<any>('GET', '/category');


  const allArticles = sportArticleResponse?.data || sportArticleResponse || [];
  const categories = categoryResponse?.data || categoryResponse || [];


  const promoArticles = allArticles.filter((item: any) => {
    const name = item.name.toLowerCase();
    return (
      name.includes('nike') || 
      name.includes('whey') || 
      name.includes('térmica') || 
      name.includes('mochila')
    );
  });
  const activeCategoryIds = promoArticles.map((item: any) => item.category_id);
  const activeCategories = categories.filter((category: any) => 
    activeCategoryIds.includes(category.id)
  );

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Ofertas Prime ⚡</h1>
        <p className={styles.subtitle}>Confira os melhores itens para o seu treino.</p>
      </header>

      {promoArticles.length > 0 ? (
        <Filter 
          sportArticle={promoArticles} 
          categories={activeCategories} 
        />
      ) : (
        <div className={styles.noResults}>
          <p>Nenhuma promoção encontrada no momento.</p>
        </div>
      )}
    </main>
  );
}