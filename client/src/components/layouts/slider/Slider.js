import React, { useState, useEffect } from 'react';
import './slider.css';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Slider = () => {
  const [active, setActive] = useState(0);
  const lengthItems = 5;
  let refreshInterval;

  const nextSlide = () => {
    setActive((prev) => (prev + 1 <= lengthItems - 1 ? prev + 1 : 0));
    reloadSlider();
  };

  const prevSlide = () => {
    setActive((prev) => (prev - 1 >= 0 ? prev - 1 : lengthItems - 1));
    reloadSlider();
  };

  const startInterval = () => {
    refreshInterval = setInterval(nextSlide, 3000);
  };

  const stopInterval = () => {
    clearInterval(refreshInterval);
  };

  // const handleDotClick = (index) => {
  //   setActive(index);
  //   reloadSlider();
  // };

  const reloadSlider = () => {
    stopInterval();

    const slider = document.querySelector('.slider .list');
    const items = document.querySelectorAll('.slider .list .item');
    const dots = document.querySelectorAll('.slider .dots li');

    slider.style.left = -items[active].offsetLeft + 'px';

    const lastActiveDot = document.querySelector('.slider .dots li.active');
    lastActiveDot.classList.remove('active');
    dots[active].classList.add('active');

    startInterval();
  };

  useEffect(() => {
    startInterval();
    return () => stopInterval();
  }, [active]);

  return (
    <section className="sliders">
      <div className="tops"><h2>News & <span className="text-book">Promotions</span></h2></div>
      <div class="slider">
        <div class="list">
          <div class="item">
            <img src="https://scontent.fbkk29-1.fna.fbcdn.net/v/t39.30808-6/409800371_750608253762910_2539148838676810661_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeG9iAaDEuua31L29kQYBsvT62DLX2CQaPrrYMtfYJBo-tPcAxXVhtp0dmG2_kgc3vkJvXMWHoV0_8ZjhOlFE5xz&_nc_ohc=xG9jx_GbDNoAX8IopEa&_nc_ht=scontent.fbkk29-1.fna&oh=00_AfDaye9aZCHT6cHfElf-Li4bSi-dsmp6IlLv0Mpwu-BsIw&oe=6583D312" alt="" />
          </div>
          <div class="item">
            <img src="https://scontent.fbkk29-6.fna.fbcdn.net/v/t39.30808-6/405711816_742974344526301_2845621913548047077_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeGaFwD5CB6Ji_DzPIVf_TY2ei0qVs1ypw16LSpWzXKnDYNykLyUA2axhts6pm4I4SrKw4vVwyDwUNguraw_Tz_E&_nc_ohc=FgSJg-VvKUMAX_4PehO&_nc_ht=scontent.fbkk29-6.fna&oh=00_AfAB9ElVA1N0zMHZRwPzYarmUKfMkJsAGPE9EPmNbw3Xmw&oe=6583752F" alt="" />
          </div>
          <div class="item">
            <img src="https://scontent.fbkk29-6.fna.fbcdn.net/v/t39.30808-6/399708624_330793843033906_8745373393994997974_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeFVXRcVoa64WLnHacIcxnV2XMnQsypQgKVcydCzKlCApep9yBexJrIMyTKggvP8_XB3IC4wBeTUr2Vwe1Hzx4y0&_nc_ohc=aiHwOfHELegAX-U9jGa&_nc_ht=scontent.fbkk29-6.fna&oh=00_AfAA82Nis9qKsv3-4b_UoU5zdAYO6teEI7lRJdcx6NVqzQ&oe=65849AFB" alt="" />
          </div>
          <div class="item">
            <img src="https://scontent.fbkk29-7.fna.fbcdn.net/v/t39.30808-6/277351705_5211743162221582_3543206812395732705_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeF1-_wWIQkcpVKQd6OIsrrWRtrVdkuj6wNG2tV2S6PrA2n_fndIxUtaQ6L2kUwnHV2nTxZ_vjGJjgLbJshZiiYg&_nc_ohc=9XaAtWAOGGgAX98cS2U&_nc_ht=scontent.fbkk29-7.fna&oh=00_AfD4_K_cyDxlpDx-7imIpBUyeME6S1cRH35MYkWVaf6zhQ&oe=65838D5B" alt="" />
          </div>
          <div class="item">
            <img src="https://scontent.fbkk29-6.fna.fbcdn.net/v/t39.30808-6/412113192_661648989501528_7740196954667351572_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeGWVrvDfcBBMGoXjfrZOavCd5SD8-H9CKh3lIPz4f0IqP4u3_4Rbi3i0vhcAcexF0h6bCHHcnBubMNMI5BK6hzk&_nc_ohc=-r_xo69Y9VgAX_jydM2&_nc_ht=scontent.fbkk29-6.fna&oh=00_AfCAle4uli7l309pfyWgC0IpAmCFi7uQJ9e7Dw89Lb6TyQ&oe=6584B4D2" alt="" />
          </div>
        </div>
        <div class="buttons">
          <button id="prev" onClick={prevSlide}><FaArrowLeft /></button>
          <button id="next" onClick={nextSlide}><FaArrowRight /></button>
        </div>
        <ul class="dots">
          <li class="active"></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </section>
  );
};

export default Slider;
