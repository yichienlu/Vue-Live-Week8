<template>
  <swiper
    :slides-per-view="3"
    :space-between="50"
  >
    <swiper-slide>
      <img src="https://images.unsplash.com/photo-1620567782734-7db77bf90550?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80" alt="">
    </swiper-slide>
    <swiper-slide>
      <img src="https://images.unsplash.com/photo-1620567782734-7db77bf90550?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80" alt="">
    </swiper-slide>
    <swiper-slide>
      <img src="https://images.unsplash.com/photo-1620567782734-7db77bf90550?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80" alt="">
    </swiper-slide>
  </swiper>
  <div class="img-cover position-relative" style="height: 50vh; background-image:url('https://images.unsplash.com/photo-1620567782734-7db77bf90550?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80');">
    <h1 class="position-absolute top-100 start-50 translate-middle fw-bolder fst-italic dancing" style="font-size: 4rem">Eden Handmade</h1>
  </div>
  <div class="py-5 text-center bg-light">
    <h3 class="text-secondary mt-5">聆聽肌膚的渴望</h3>
    <br>
    <p>純手工、純天然</p>
    <p>每一顆手工皂，都飽含Eden真摯的誠意</p>
  </div>
  <div class="container py-5">
    <div class="position-relative text-center my-5" style="height: 300px;">
      <div class="position-absolute start-0 end-25 top-0 bottom-0 img-cover" style="background-image:url('https://images.unsplash.com/photo-1605264964528-06403738d6dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80');"></div>
      <div class="position-absolute start-50 end-0 top-25 bottom-25 text-center">
        <h2 class="dancing">Warmth</h2>
        <h3 class="text-secondary fw-bold">
          手作溫度
        </h3>
        <p>
          純手工製作，心與心之間的暖流，<br class="d-none d-lg-block">
          是機器無法替代的溫度
        </p>
        <router-link to="/products">看更多</router-link>
      </div>
    </div>
    <div class="position-relative text-center my-5" style="height: 300px;">
      <div class="position-absolute start-25 end-0 top-0 bottom-0 img-cover" style="background-image:url('https://images.unsplash.com/photo-1536882240095-0379873feb4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80');"></div>
      <div class="position-absolute start-0 end-50 top-25 bottom-25 text-center">
        <h2 class="dancing">Natural</h2>
        <h3 class="text-secondary fw-bold">
          純淨天然
        </h3>
        <p>
          選用純天然成份，無添加防腐劑，<br class="d-none d-md-block">
          給肌膚最純粹、細緻的呵護
        </p>
        <router-link to="/products">看更多</router-link>
      </div>
    </div>
    <div class="position-relative text-center my-5" style="height: 300px;">
      <div class="position-absolute start-0 end-25 top-0 bottom-0 img-cover" style="background-image:url('https://images.unsplash.com/photo-1590541576391-dfc42314a7ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80');"></div>
      <div class="position-absolute start-50 end-0 top-25 bottom-25 text-center">
        <h2 class="dancing">Organic</h2>
        <h3 class="text-secondary fw-bold">
          有機環保
        </h3>
        <p>
          有機成分 100% 可被水分解，<br class="d-none d-md-block">
          不會對水源及環境造成傷害
        </p>
        <router-link to="/products">看更多</router-link>
      </div>
    </div>
  </div>
  <div class="container my-5">
    <hr class="mb-5">
    <h2 class="fw-bold text-center mb-4">精選商品<span class="dancing h3 text-secondary fw-bold ms-3">Products</span></h2>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4">
      <router-link to="/products" class="col d-block position-relative img-cover product-animation" style="height: 200px;background-image: url('https://images.unsplash.com/photo-1624459404847-5ad5f6a09246?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80')">
        <div class="position-absolute top-0 bottom-0 start-0 end-0 fs-5"></div>
        <h3 class="position-absolute bottom-0 end-0 fw-bold m-2">手工皂系列</h3>
      </router-link>
      <router-link to="/products" class="col d-block position-relative img-cover product-animation" style="height: 200px;background-image: url('https://images.unsplash.com/photo-1618840313388-80cf273ee00c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')">
        <div class="position-absolute top-0 bottom-0 start-0 end-0 fs-5"></div>
        <h3 class="position-absolute bottom-0 end-0 fw-bold m-2">禮盒系列</h3>
      </router-link>
      <router-link to="/products" class="col d-block position-relative img-cover product-animation" style="height: 200px;background-image: url('https://images.unsplash.com/photo-1623316162710-fff35db05790?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80')">
        <div class="position-absolute top-0 bottom-0 start-0 end-0 fs-5"></div>
        <h3 class="position-absolute bottom-0 end-0 fw-bold m-2">送禮首選</h3>
      </router-link>
        <router-link to="/products" class="col d-block position-relative img-cover product-animation" style="height: 200px;background-image: url('https://images.unsplash.com/photo-1622116579714-9e25f3a3a1b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80')">
        <div class="position-absolute top-0 bottom-0 start-0 end-0 fs-5"></div>
        <h3 class="position-absolute bottom-0 end-0 fw-bold m-2">特惠商品</h3>
        </router-link>
    </div>
    </div>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'
// Import Swiper styles
import 'swiper/swiper.scss'

export default {
  name: 'HomeView',
  components: {
    Swiper,
    SwiperSlide
  }
}
</script>
