<template>
  <div class="container my-5">
    <div class="mb-5">
      <ul class="d-flex justify-content-center list-unstyled">
        <li style="width: 20%" class="text-center position-relative">
          <div class="text-primary">購物車</div>
          <div class="step-bar bg-primary"></div>
          <div class="step-circle bg-primary">
            <span>1</span>
          </div>
        </li>
        <li style="width: 20%" class="text-center position-relative">
          <div class="text-primary">建立訂單</div>
          <div class="step-bar bg-primary"></div>
          <div class="step-circle bg-primary mx-auto">
            <span>2</span>
          </div>
        </li>
        <li style="width: 20%" class="text-center position-relative">
          <div class="text-primary">付款</div>
          <div class="step-bar bg-primary"></div>
          <div class="step-circle bg-primary mx-auto">
            <span>3</span>
          </div>
        </li>
        <li style="width: 20%" class="text-center">
          <div class="text-primary fw-bold">付款完成</div>
          <div class="step-circle bg-primary mx-auto">
            <span>4</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-8 text-center my-5 py-5">
        <h1 class="dancing fw-bold text-secondary mb-5">THANK YOU</h1>
        <p class="mb-4">感謝您選購伊登手工皂，<br class="d-block d-md-none">
          祝您擁有美好的一天！</p>
        <router-link to="/products">
          <button class="btn btn-primary">繼續購物</button>
        </router-link>
      </div>
      <div class="col-4 img-cover" style="background-image: url('https://images.unsplash.com/photo-1605264549526-19ee0a3eed5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80')"></div>
    </div>
  </div>

</template>

<script>
export default {

}
</script>
