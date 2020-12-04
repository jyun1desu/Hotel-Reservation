# 旅館預約服務

### DEMO

[https://jyun1desu.github.io/Hotel-Reservation](https://jyun1desu.github.io/Hotel-Reservation/#/)

---
### 使用技術
- Vue CLI
- Vuex
- Vue Router
- Sass
- axios

---

### 實現功能
- RWD：支援手機、平板、電腦等裝置。
#### 首頁
* 背景輪播六種房型，移動滑鼠到任一房型上背景顯示該房型。
* 手機大小時，隱藏房型選單、點選出現。
#### 單一房型頁面
* 顯示詳細資訊：房間描述、價格、服務列表⋯⋯等。
* 點選banner放大檢視圖片，點擊出現上一張、下一張。
* 日曆：
    * 可以預約未來 90 天的房間、及瀏覽預約狀況
    * 點按日期或是預約按鈕都可以開啟預約畫面
    * 超過90天的日期無法預約
    * 選擇入住日後，將無法點選某些日期（如：入住日之前、入住與退房日間已有其他預約⋯⋯等）作為退房日。
    * 使用正則表達式驗證手機號碼是否符合規範
    * 送出預約後等待預約結果時添加等待動畫。
    * 回傳預約結果：
        * **成功**：即時顯示在日曆上
        * **失敗**：預約時間已被人預訂
---
### 學習記錄
* 串接 API(get,post) 
* API 統一管理 (axios 封裝)。
* 使用 async function 處理非同步事件
* vuex action
* vue router 生命週期
* Vue CLI部署至github page
