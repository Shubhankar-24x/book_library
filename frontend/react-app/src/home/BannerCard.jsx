import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// Import required Swiper modules
import { EffectCards, Autoplay } from 'swiper/modules';

import './BannerCard.css';

const BannerCard = () => {
  return (
    <div className='banner'>
      <Swiper
        effect={'cards'} // Apply the 'cards' effect
        grabCursor={true} // Allow cursor grab
        modules={[EffectCards, Autoplay]} // Import EffectCards and Autoplay modules
        autoplay={{
          delay: 1000, // Delay between automatic slide changes (2 seconds)
          disableOnInteraction: false, // Continue autoplay after user interaction
        }}
        loop={true} // Infinite loop of slides
        className="mySwiper"
      >
        {/* SwiperSlides with background images */}
        <SwiperSlide style={{ backgroundImage: "url('src/assets/books/book1.jpg')" }}></SwiperSlide>
        <SwiperSlide style={{ backgroundImage: "url('src/assets/Books/book3.jpg')" }}></SwiperSlide>
        <SwiperSlide style={{ backgroundImage: "url('src/assets/Books/book4.jpg')" }}></SwiperSlide>
        <SwiperSlide style={{ backgroundImage: "url('src/assets/Books/book5.jpg')" }}></SwiperSlide>
        <SwiperSlide style={{ backgroundImage: "url('src/assets/Books/book6.jpg')" }}></SwiperSlide>
        <SwiperSlide style={{ backgroundImage: "url('src/assets/Books/book7.jpg')" }}></SwiperSlide>
        <SwiperSlide style={{ backgroundImage: "url('src/assets/Books/book2.jpg')" }}></SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BannerCard;
