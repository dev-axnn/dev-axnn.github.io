  // 웹 디자인 메뉴관련
  let webdesignMenuA = $(".webdesign-menu a");
  $.each(webdesignMenuA, function (index, item) {
    $(this).click(function (event) {
      event.preventDefault();
      webdesignMenuA.removeClass("webdesign-menu-active");
      $(this).addClass("webdesign-menu-active");
      let tempData = $(this).attr("web-data-cate");
      showWebSlide(tempData);
    });
  });

  let webdesignMbMenu = $(".webdesign-mb-menu");
  webdesignMbMenu.change(function () {
    let v = $(this).val();
    showWebSlide(v);
  });

  // 웹 디자인 데이터 호출
  let allWebdesignData = [];
  let webdesignSw = $(".webdesign-sw");
  let webdesignSwWrapper = webdesignSw.find(".swiper-wrapper");
  let webdesignHtml = "";
  let webdesignSwSlide;
  let webdesignCate;

  fetch("/js/Webdesign.json")
    .then((res) => res.json())
    .then((data) => {
      allWebdesignData = data;
      showWebSlide("all");
    })
    .catch((err) => {
      console.log(err);
    });

  if (_cate == "all") {
  // 모든 콘텐츠 다 보여줌
  allWebdesignData.forEach(function (item, index) {
    let tempHtml = `
      <div class="webdesign-cate-item swiper-slide">
        <a href="${item.popup}" target="_blank" class="webdesign-link">link</a>
        <a href="${item.popup}" target="_blank" class="preview" style="background: url('../images/${item.image}') no-repeat center top; background-size: 100%; transition: all 0.5s;"></a>
        <h5>${item.title}</h5>
        <p><span></span>작업기간 : ${item.day}일</p>
        <div class="webdesign-btn">
          <a href="#" onclick="return false;" target="_blank" class="webdesign-btn-w" ${item.detailed
            ? 'style="color: #fff; background: #242A53;"'
            : 'style="display:none"'
            }>상세페이지 디자인
          </a>
          <a href="#" onclick="return false;" target="_blank" class="webdesign-btn-w" ${item.uiux
            ? 'style="color: #fff; background: #242A53;"'
            : 'style="display:none"'
            }>UI/UX 디자인(피그마)
          </a> 
        </div>
      </div>
    `;
    webdesignHtml += tempHtml;
  });

  } else if (_cate == "detailed") {
    // detailed가 true인 콘텐츠만
    allWebdesignData.forEach(function (item, index) {
      if (item.detailed) {
        let tempHtml = `
          <div class="webdesign-cate-item swiper-slide">
            <a href="${item.popup}" target="_blank" class="webdesign-link">link</a>
            <a href="${item.popup}" target="_blank" class="preview" style="background: url('../images/${item.image}') no-repeat center top; background-size: 100%; transition: all 0.5s;"></a>
            <h5>${item.title}</h5>
            <p><span></span>작업기간 : ${item.day}일</p>
            <div class="webdesign-btn">
              <a href="#" onclick="return false;" target="_blank" class="webdesign-btn-w" style="color: #fff; background: #242A53;">상세페이지 디자인</a>
            </div>
          </div>
        `;
        webdesignHtml += tempHtml;
      }
    });

  } else if (_cate == "uiux") {
    // uiux가 true인 콘텐츠만
    allWebdesignData.forEach(function (item, index) {
      if (item.uiux) {
        let tempHtml = `
          <div class="webdesign-cate-item swiper-slide">
            <a href="${item.popup}" target="_blank" class="webdesign-link">link</a>
            <a href="${item.popup}" target="_blank" class="preview" style="background: url('../images/${item.image}') no-repeat center top; background-size: 100%; transition: all 0.5s;"></a>
            <h5>${item.title}</h5>
            <p><span></span>작업기간 : ${item.day}일</p>
            <div class="webdesign-btn">
              <a href="#" onclick="return false;" target="_blank" class="webdesign-btn-w" style="color: #fff; background: #242A53;">UI/UX 디자인(피그마)</a>
            </div>
          </div>
        `;
        webdesignHtml += tempHtml;
      }
    });
  }

  function makeWebdesignSlide() {
    if (webdesignSwSlide != null) {
      webdesignSwSlide.destroy();
    }
    webdesignSwSlide = new Swiper(".webdesign-sw", {
      slidesPerView: 3,
      spaceBetween: 45,
      slidesPerGroup: 3,
      loopFillGroupWithBlank: true, // 그룹수가 맞지 않을 경우 빈칸으로 메우기
      loop: true,
      speed: 1500,
      autoplay: false,
      keyboard: {
        enabled: true,
      },
      pagination: {
        el: ".webdesign-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".webdesign-btn-next",
        prevEl: ".webdesign-btn-prev",
      },

      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 15,
          slidesPerGroup: 1,
        },

        // 750보다 클 경우
        751: {
          slidesPerView: 2,
          spaceBetween: 15,
          slidesPerGroup: 2,
        },

        // 1000보다 클 경우
        1001: {
          slidesPerView: 2,
          spaceBetween: 30,
          slidesPerGroup: 2,
        },

        // 1200보다 클 경우
        1201: {
          slidesPerView: 2,
          spaceBetween: 60,
          slidesPerGroup: 2,
        },

        // 1300보다 클 경우
        1301: {
          slidesPerView: 3,
          spaceBetween: 20,
          slidesPerGroup: 3,
        },

        // 1400보다 클 경우
        1401: {
          slidesPerView: 3,
          spaceBetween: 45,
          slidesPerGroup: 3,
        },
      },
    });
  }