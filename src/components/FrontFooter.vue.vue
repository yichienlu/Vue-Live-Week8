<template>
  <div class="p-4 p-md-5 bg-light">
    <div class="container">
    <div class="row text-secondary">
      <div class="col-lg-9">
        <h4 class="text-primary">聯絡我們</h4>
          <p>若關於購物問題或建議想法，歡迎使用客服專線，我們有專人為您服務。</p>
          <p>
            客服時間：
            <span class="text-primary">
              週一至週五 AM9:30~12:00；PM1:30~6:00
              (例假日恕無提供電話服務)
            </span>
          </p>
          <p>
            客服專線：
            <a href="tel:+886222345678">02-2234-5678</a>
          </p>
          <p>
            電子信箱：
            <a href="mailto:service@edenhandmade.com">service@edenhandmade.com</a>
          </p>

      </div>
      <div class="col-lg-3 mt-4 mt-lg-0">
        <h4 class="text-primary">追蹤我們</h4>
        <ul class="list-unstyled d-flex">
          <li class="me-3"><a href="#"><i class="bi bi-facebook fs-1"></i></a></li>
          <li class="me-3"><a href="#"><i class="bi bi-instagram fs-1"></i></a></li>
          <li><a href="#"><i class="bi bi-line fs-1"></i></a></li>
        </ul>
      </div>
    </div>
    </div>
  </div>
  <div class="py-3 pb-4 py-4 bg-dark text-white text-center">
    Copyright © 2021 Yi-Chien Lu. All rights reserved. <br>
    <span style="font-size: 0.5rem">僅做為學習使用，非做商業用途</span>
  </div>
  <div class="d-lg-none position-sticky bottom-0 bg-light shadow" style="z-index:1000">
    <div class="container d-flex justify-content-between p-2">
      <FrontCart/>
      <FrontMember/>
    </div>
  </div>
</template>

<script>
import FrontMember from '@/components/FrontMember.vue'
import FrontCart from '@/components/FrontCart.vue'

export default {
  name: 'FrontFooter',
  components: {
    FrontMember,
    FrontCart
  }
}
</script>
