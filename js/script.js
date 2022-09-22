$(document).ready(function () {
  AOS.init();

  // $('.counter').counterUp({
  //   delay: 10,
  //   time: 1000
  // });
});

window.onload = function () {
  let gnbMenuA = $(".gnb > li > a");
  let sectionArr = $(".wrap > section");

  $.each(sectionArr, function (index, item) {
    new Waypoint({
      element: $(this),
      handler: function (direction) {
        if (direction == "down") {
          // 스크롤을 아래로 내릴떄
          gnbMenuA.removeClass("gnb-active");
          gnbMenuA.eq(index).addClass("gnb-active");
        } else if (direction == "up") {
          // 스크롤을 위로 올릴떄
          let tempIndex = index - 1;
          if (index != 0) {
            gnbMenuA.removeClass("gnb-active");
            gnbMenuA.eq(tempIndex).addClass("gnb-active");
          }
        }
      },
      offset: "50%",
    });
  });

  // Chart Animation
  new Waypoint({
    element: $(".profile"),
    handler: function (direction) {
      if (direction == "down") {
        $(".chart-graph").addClass("chart-graph-active");
      } else if (direction == "up") {
        $(".chart-graph").removeClass("chart-graph-active");
      }
    },
    offset: "20%",
  });

  // FIX REMOTE 색반전
  new Waypoint({
    element: $(".about"),
    handler: function (direction) {
      if (direction == "down") {
        $(".fix-remote").addClass("fix-remote-reversal");
      } else if (direction == "up") {
        $(".fix-remote").removeClass("fix-remote-reversal");
      }
    },
    offset: "85%",
  });

  // 포트폴리오 메뉴관련
  let portfolioMenuA = $(".portfolio-menu a");
  $.each(portfolioMenuA, function (index, item) {
    $(this).click(function (event) {
      event.preventDefault();
      portfolioMenuA.removeClass("portfolio-menu-active");
      $(this).addClass("portfolio-menu-active");
      let tempData = $(this).attr("data-cate");
      showSlide(tempData);
    });
  });

  // 포트폴리오 데이터 호출
  let allPortfolioData = [];
  let portSw = $(".port-sw");
  let portSwWrapper = portSw.find(".swiper-wrapper");
  let portHtml = "";
  let portSwSlide;
  let portCate;

  fetch("/js/portfolio.json")
    .then((res) => res.json())
    .then((data) => {
      allPortfolioData = data;
      showSlide("all");
    })
    .catch((err) => {
      console.log(err);
    });

  function showSlide(_cate) {
    if (portCate == _cate) {
      return;
    }
    portCate = _cate;
    portHtml = "";
    if (_cate == "mobile") {
      allPortfolioData.forEach(function (item, index) {
        if (item.mb) {
          let tempHtml = `
          <div class="port-cate-item swiper-slide">
            <a href="${item.weblink}" target="_blank" class="port-link">link</a>
            <a href="${
              item.weblink
            }" target="_blank" class="preview" style="background: url('../images/${
            item.image
          }') no-repeat center top; background-size: 100%; transition: all 0.5s;"></a>
            <h5>${item.title}</h5>
            <p><span></span>작업기간 : ${item.day}일</p>
            <div class="port-btn">
              <a href="${
                item.weblink
              }" target="_blank" class="port-btn-reqular" style="color: #fff; background: #242A53;">WORK</a>
              <a href="${
                item.webgit
              }" target="_blank" class="port-btn-reqular" style="color: #fff; background: #242A53;">GitHub</a>
              <a href="${
                item.originlink
              }" target="_blank" class="port-btn-reqular" style="color: #fff; background: #242A53;">Origin</a>
              <a href="${item.vuelink}" target="_blank" class="port-btn-vue" ${
            item.vue
              ? 'style="color: #444; background: #eee;"'
              : 'style="display:none"'
          }>VUE.js WORK</a>
              <a href="${item.vuegit}" target="_blank" class="port-btn-vue" ${
            item.vue
              ? 'style="color: #444; background: #eee;"'
              : 'style="display:none"'
          }>VUE.js GitHub</a> 
            </div>
            <div class="port-mark">
              ${item.pc ? '<span class="port-mark-web">Web</span>' : ""}
              ${item.mb ? '<span class="port-mark-mob">Mobile</span>' : ""}
            </div>
          </div>
          `;
          portHtml += tempHtml;
        }
      });
      portSwWrapper.html(portHtml);
      makeSlide();
    } else if (_cate == "vue") {
      allPortfolioData.forEach(function (item, index) {
        if (item.vue) {
          let tempHtml = `
        <div class="port-cate-item swiper-slide">
          <a href="${item.weblink}" target="_blank" class="port-link">link</a>
          <a href="${
            item.weblink
          }" target="_blank"  class="preview" style="background: url('../images/${
            item.image
          }') no-repeat center top; background-size: 100%; transition: all 0.5s;"></a>
          <h5>${item.title}</h5>
          <p><span></span>작업기간 : ${item.day}일</p>
          <div class="port-btn">
          <a href="${
            item.weblink
          }" target="_blank" class="port-btn-reqular" style="color: #fff; background: #242A53;">WORK</a>
          <a href="${
            item.webgit
          }" target="_blank" class="port-btn-reqular" style="color: #fff; background: #242A53;">GitHub</a>
          <a href="${
            item.originlink
          }" target="_blank" class="port-btn-reqular" style="color: #fff; background: #242A53;">Origin</a>
          <a href="${item.vuelink}" target="_blank" class="port-btn-vue" ${
            item.vue
              ? 'style="color: #444; background: #eee;"'
              : 'style="display:none"'
          }>VUE.js WORK</a>
          <a href="${item.vuegit}" target="_blank" class="port-btn-vue" ${
            item.vue
              ? 'style="color: #444; background: #eee;"'
              : 'style="display:none"'
          }>VUE.js GitHub</a> 
          </div>
          <div class="port-mark">
            ${item.pc ? '<span class="port-mark-web">Web</span>' : ""}
            ${item.mb ? '<span class="port-mark-mob">Mobile</span>' : ""}
          </div>
        </div>
        `;
          portHtml += tempHtml;
        }
      });
      portSwWrapper.html(portHtml);
      makeSlide();
    } else if (_cate == "figma") {
      allPortfolioData.forEach(function (item, index) {
        if (item.figma) {
          let tempHtml = `
          <div class="figma-item swiper-slide">
            <a href="${item.weblink}" target="_blank" class="port-link">link</a>
            <a href="${item.weblink}" target="_blank" class="preview" style="background: url('../images/${item.image}') no-repeat center 20%; background-size: 100%; transition: all 0.5s;"></a>
            <h5>${item.title}</h5>
            <p><span></span>작업기간 : ${item.day}일</p>
            <p class="figma-desc">${item.desc}</p>
          </div>
        `;
          portHtml += tempHtml;
        }
      });
      portSwWrapper.html(portHtml);
      makeSlide();
    } else {
      // 전체보여주기
      allPortfolioData.forEach(function (item, index) {
        if (item.pc) {
          let tempHtml = `
          <div class="port-cate-item swiper-slide">
            <a href="${item.weblink}" target="_blank" class="port-link">link</a>
            <a href="${
              item.weblink
            }" target="_blank"  class="preview" style="background: url('../images/${
            item.image
          }') no-repeat center top; background-size: 100%; transition: all 0.5s;"></a>
            <h5>${item.title}</h5>
            <p><span></span>작업기간 : ${item.day}일</p>
            <div class="port-btn">
            <a href="${
              item.weblink
            }" target="_blank" class="port-btn-reqular" style="color: #fff; background: #242A53;">WORK</a>
            <a href="${
              item.webgit
            }" target="_blank" class="port-btn-reqular" style="color: #fff; background: #242A53;">GitHub</a>
            <a href="${
              item.originlink
            }" target="_blank" class="port-btn-reqular" style="color: #fff; background: #242A53;">Origin</a>
            <a href="${item.vuelink}" target="_blank" class="port-btn-vue" ${
            item.vue
              ? 'style="color: #444; background: #eee;"'
              : 'style="display:none"'
          }>VUE.js WORK</a>
            <a href="${item.vuegit}" target="_blank" class="port-btn-vue" ${
            item.vue
              ? 'style="color: #444; background: #eee;"'
              : 'style="display:none"'
          }>VUE.js GitHub</a>
            </div>
            <div class="port-mark">
              ${item.pc ? '<span class="port-mark-web">Web</span>' : ""}
              ${item.mb ? '<span class="port-mark-mob">Mobile</span>' : ""}
            </div>
          </div>
          `;
          portHtml += tempHtml;
        }
      });
      portSwWrapper.html(portHtml);
      makeSlide();
    }
  }

  function makeSlide() {
    if (portSwSlide != null) {
      portSwSlide.destroy();
    }
    portSwSlide = new Swiper(".port-sw", {
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
        el: ".port-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".port-btn-next",
        prevEl: ".port-btn-prev",
      },
    });
  }

  let deSlide = new Swiper(".design-sw", {
    loop: true,
    pagination: {
      el: ".design-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".design-btn-next",
      prevEl: ".design-btn-prev",
    },
  });

  function dPaginaiton(_slide) {
    deSlide.slideTo(_slide, 1000, false);
  }

  // 디자인 메뉴 (수정해야함 포커스 유지가 안 돼요)
  let branding = $(".branding");
  let symbol = $(".symbol");
  let edit = $(".edit");
  let drawing = $(".drawing");

  branding.click(function () {
    dPaginaiton(1);
  });

  symbol.click(function () {
    dPaginaiton(2);
  });

  edit.click(function () {
    dPaginaiton(4);
  });

  drawing.click(function () {
    dPaginaiton(6);
  });
  // $.each(designMenuA, function (index, item) {
  //   $(this).click(function (event) {
  //     event.preventDefault();
  //     designMenuA.removeClass('design-menu-active')
  //     $(this).addClass('design-menu-active');
  //     let tempData = $(this).attr('data-cate');
  //     showSlide(tempData);
  //   });
  // });

  new Swiper(".design-sw", {
    loop: true,
    pagination: {
      el: ".design-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".design-btn-next",
      prevEl: ".design-btn-prev",
    },
  });

  function makeCircle(_id, _color, _point) {
    let bar = new ProgressBar.Circle(_id, {
      strokeWidth: 6,
      easing: "easeInOut",
      duration: 1400,
      color: _color,
      trailColor: "#aaa",
      trailWidth: 1,
      svgStyle: null,
    });
    bar.animate(_point);
  }

  let bar_html = makeCircle(pro1, "#ff7200", "0.95");
  let bar_css = makeCircle(pro2, "#2196f3", "0.95");
  let bar_js = makeCircle(pro3, "#ffd800", "0.95");
  let bar_jq = makeCircle(pro4, "#aaa", "0.95");
  let bar_vue = makeCircle(pro5, "#20dd88", "0.95");
  let bar_scss = makeCircle(pro6, "#ff62b1", "0.95");
  let bar_figma = makeCircle(pro7, "#62f1ff", "0.95");
  let bar_git = makeCircle(pro8, "#fff", "0.95");
  let bar_photo = makeCircle(pro9, "#00a9ff", "0.95");
  let bar_illust = makeCircle(pro10, "#ff9a00", "0.95");
  let bar_indesign = makeCircle(pro11, "#fd3365", "0.95");

  new Swiper(".skill-sw", {
    slidesPerView: 4,
    spaceBetween: 85,
    slidesPerGroup: 4,
    loopFillGroupWithBlank: true,
    loop: false,
    speed: 1500,
    keyboard: {
      enabled: true,
    },
    pagination: {
      el: ".skill-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".skill-btn-next",
      prevEl: ".skill-btn-prev",
    },
  });
};
