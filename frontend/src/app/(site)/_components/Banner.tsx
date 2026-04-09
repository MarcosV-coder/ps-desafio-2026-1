'use client'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import styles from './banner.module.css';


import 'swiper/css/bundle' 

export default function Banner() {
  const slides = [
    { 
      id: 1, 
      src: '/assets/images/banner.jpg', 
      title: 'Nova Coleção 2026', 
      subtitle: 'Até 30% de desconto em artigos selecionados.',
      buttonText: 'Ver Coleção'
    },
    { 
      id: 2, 
      src: '/assets/images/banner.jpg', // Podes trocar por outra imagem depois
      title: 'Equipamento Profissional', 
      subtitle: 'Leva o teu treino para o próximo nível.',
      buttonText: 'Saber Mais'
    },
  ]

  return (
    <div className={styles.container}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade" // Efeito de transição suave
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className={styles.slideWrapper}>
              <Image
                className={styles.bannerImage}
                src={slide.src}
                alt={slide.title}
                width={1280}
                height={500}
                priority
              />

              <div className={styles.promoOverlay}>
                <h2 className={styles.promoTitle}>{slide.title}</h2>
                <p className={styles.promoSubtitle}>{slide.subtitle}</p>
                <button className={styles.promoButton}>{slide.buttonText}</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
