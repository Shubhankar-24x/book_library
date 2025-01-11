import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// React icons
import { FaStar } from 'react-icons/fa6';
import { Avatar } from "flowbite-react";
import proPic from "../assets/profile.jpg";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// Import required modules
import { Pagination, Autoplay } from 'swiper/modules';

const Review = () => {
  return (
    <div className='my-12 px-4 lg:px-24'>
      <h2 className='text-5xl font-bold text-center mb-10 leading-snug'>Our Customers</h2>
      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          autoplay={{
            delay: 1000, // Time in milliseconds between automatic slides
            disableOnInteraction: false, // Continue autoplay after user interaction
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {[...Array(6)].map((_, index) => (
            <SwiperSlide key={index} className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
              <div className='space-y-6'>
                <div className='text-amber-500 flex gap-2'>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                {/* Text */}
                <div className='mt-7'>
                  <p className='mb-5'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur atque recusandae sit
                    suscipit, totam, blanditiis assumenda accusantium officiis quisquam placeat quas aperiam quibusdam
                    error ea odio beatae! Atque, perspiciatis qui!
                  </p>
                  <Avatar
                    alt="avatar of Jese"
                    img={proPic}
                    rounded
                    className='w-10 mb-4'
                  />
                  <h5 className='text-lg font-medium'>Mark Ping</h5>
                  <p className='text-base'>CEO ,ABC Company</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Review;
