'use client'

import { categoryType } from '@/types/category';
import styles from './filter.module.css';
import { sportArticleType } from '@/types/sportArticle';
import { useState } from 'react';
import ProductCard from './ProductCard';    

export default function Filter ({categories, sportArticle}: {sportArticle: sportArticleType[], categories: categoryType[]}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState ("all");

    const FilteredSportArticle = sportArticle.filter((sportArticle) => {
        const matchesName = sportArticle.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
        const matchesCategory = selectedCategory === "all" || String (sportArticle.category.id) === selectedCategory;
        return matchesName && matchesCategory;
    });
    return (
        <div className={styles.storeContainer}>
            <div className={styles.filterHeader}>
                <input 
                    className={styles.searchInput}
                    type="text"
                    placeholder="Buscar produto..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className={styles.categoryTabs}>
                    <button 
                        onClick={() => setSelectedCategory("all")}
                        className={selectedCategory === "all" ? styles.activeTab : styles.tab}
                    >
                        Todos
                    </button>
                    {categories.map((category) => (
                        <button 
                            key={category.id} 
                            onClick={() => setSelectedCategory(String(category.id))}
                            className={selectedCategory === String(category.id) ? styles.activeTab : styles.tab}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>
            <div className={styles.productCarouselWrapper}>
                {FilteredSportArticle.length > 0 ? (
                    FilteredSportArticle.map((item) => (
                        <div key={item.id} className={styles.carouselSlide}>
                             <ProductCard sportArticle={item} />
                        </div>
                    ))
                ) : (
                    <p>Nenhum produto foi encontrado com esse filtro</p>
                )}
            </div>
        </div>
    );
}