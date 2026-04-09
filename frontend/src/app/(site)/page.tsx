import { api } from "@/services/api";
import Banner from "./_components/Banner";
import Filter from "./_components/Filter";

export default async function Home() {
  const {response : sportArticleResponse } = await api<any>('GET', '/sportArticle');
  const {response : categoryResponse } = await api<any>('GET', '/category');
  const sportArticle = sportArticleResponse?.data || sportArticleResponse || [];
  const category = categoryResponse?.data || categoryResponse || [];

  return (
    <main>
      <Banner /> 
      <Filter sportArticle={sportArticle} 
      categories ={category} />
    </main>
  )
}
