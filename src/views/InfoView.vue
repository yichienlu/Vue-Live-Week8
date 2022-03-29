<template>
  <div class="container">
    <div class="row justify-content-around">
      <div class="col-md-4 border img-cover" style="background-image:url('https://images.unsplash.com/photo-1618840392854-0adfa1a86798?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')">
        <div class="d-block d-lg-none" style="height: 200px"></div>
      </div>
      <div class="col-md-8 col-lg-6 my-4 my-lg-5">
        <h1 class="fw-bold text-center mb-4 mb-lg-5">購物須知 <span class="dancing h2 text-secondary fw-bold">Help Center</span></h1>
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                付款方式
              </button>
            </h2>
            <div
              id="collapseOne"
              class="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <ul>
                  <li>
                    信用卡即時線上一次刷卡付款 <br />
                    方便又好用的付款方式，當您選擇線上刷卡方式進行交易時，作業流程透過SSL加密機制，保障您的個人隱私資料。
                  </li>
                  <li>
                    超商付款取貨 <br />
                    適合不方便在家收貨或者不方便使用ATM與無信用卡的消費者。
                  </li>
                  <li>
                    ATM付款 <br />
                    適用沒有信用卡或者不方便前往超商取貨付款的消費者。使用ATM付款方式只需將訂單款項透過實體/網路ATM或者網路銀行直接匯入系統指定帳號即可完成付款。
                  </li>
                  <li>
                    貨到付款 <br />
                    適用沒有信用卡或者不方便前往超商取貨付款的客戶。使用貨到付款方式只需於配達貨物時，將訂單款項以新台幣現金的方式繳款即可完成付款。
                  </li>
                  <li>
                    LINE Pay <br />
                    付款不需輸入信用卡資訊及3D驗證，僅需輸入專屬密碼即可使用信用卡進行付款，節省您的付款時間。
                  </li>
                  <li>
                    街口支付 <br />
                    請先備妥您行動裝置中的街口支付應用程式，可使用街口儲值帳戶/銀行帳戶，並搭配街口幣進行付款。
                  </li>
                  <li>
                    Apple Pay <br />
                    請先備妥您行動裝置中的Apple Pay
                    Wallet，可使用綁定的信用卡結帳，交易過程全程加密，交易安全有保障。
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                運送方式
              </button>
            </h2>
            <div
              id="collapseTwo"
              class="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <ol>
                  <li>
                    帳款確認後將立即處理您的訂單，您將於七個工作日內(不含週六日及國定例假日)收到訂購之商品。
                  </li>
                  <li>以 郵局/便利袋/宅配通/宅急便 寄送商品。</li>
                  <li>配送範圍限台灣本島各縣市(不含郵政信箱)。</li>
                  <li>
                    如本店無法接受您的訂單，將於收到您的訂單後二個工作日內通知您。但法令另有規定者除外。
                  </li>
                </ol>
                注意事項：店家保留訂單接受與否權利，若因交易條件有誤或有其他情形導致商店無法接受您的訂單，將取消訂單，造成您的不便，敬請見諒。
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                退換貨說明
              </button>
            </h2>
            <div
              id="collapseThree"
              class="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <ol>
                  <li>
                    收到商品後如發現有瑕疵或破損或是配件短缺的狀況，需要辦理換貨，請於到貨後7天內登錄「我的帳戶」頁面申請「換貨」，我們將盡速為您處理。
                  </li>
                  <li>
                    收到商品後可享有7天免費鑑賞期(含例假日)，鑑賞期係供您參考、觀賞、品鑑比較。退換貨（依照退貨程序辦理退貨）時敬請保持原包裝商品的完整，我們完全保障您的購物權益。
                  </li>
                  <li>
                    退換貨注意事項：退貨的商品必須必須回復原狀，亦即必須回復至您收到商品時的原始狀態
                    ( 包含主機、附件、內外包裝、隨機文件、贈品、活動贈品等 )
                  </li>
                  <li>若您已取得紙本發票，請於退貨時一併退還。</li>
                  <li>
                    請您以送貨廠商使用之包裝紙箱將退貨商品包裝妥當，若原紙箱已遺失，請另使用其他紙箱包覆於商品原廠包裝之外，切勿直接於原廠包裝上黏貼紙張或書寫文字。若原廠包裝損毀將無法退貨或須將損壞費用於退款中扣抵。
                  </li>
                  <li>
                    當您申請退換貨後，請主動向貨運人員索取單據，並保留至退換貨完成，以利日後查詢。
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>
