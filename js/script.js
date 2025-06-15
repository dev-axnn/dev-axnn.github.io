window.onbeforeunload = function () {
  //현재 페이지에서 다른 페이지로 넘어갈 때 표시해주는 기능
  let showLoading = () => {
    $("#loading").fadein(500);
  };
  showLoading();
};

$(window).load(function () {
  //페이지가 로드 되면 로딩 화면을 없애주는 것
  let hideLoading = () => {
    $("#loading").fadeOut(500);
    //$("html").css("overflowY", "auto");
  };
  setTimeout(function () {
    hideLoading();
  }, 500);
});

let allPortfolioData = [];

window.onload = function () {
  AOS.init();

  // 모바일 버튼 활성화
  let menuBtn = $(".mbmenu-btn");
  let menuWrap = $(".mbmenu-wrap");
  menuBtn.click(function () {
    let result = menuBtn.hasClass("mbmenu-btn-close");
    if (result) {
      menuBtn.removeClass("mbmenu-btn-close");
      menuWrap.hide();
    } else {
      menuBtn.addClass("mbmenu-btn-close");
      menuWrap.show();
    }
  });

  // 반응형 처리
  $(window).resize(function () {
    // 화면의 너비
    let temp = $(window).width();
    if (temp > 1200) {
      menuWrap.hide();
      menuBtn.removeClass("mbmenu-btn-close");
    }
  });

  // 모바일 메뉴 바깥 부분 클릭시 닫기
  menuWrap.click(function () {
    menuBtn.removeClass("mbmenu-btn-close");
    menuBtn.addClass("mbmenu-btn-open");
    menuWrap.hide();
  });

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

  // Visual-line Animation
  new Waypoint({
    element: $(".profile"),
    handler: function (direction) {
      if (direction == "down") {
        $(".visual-bg p").addClass("p-hidden");
        $(".visual-bg .line").addClass("line-hidden");
      } else if (direction == "up") {
        $(".visual-bg p").removeClass("p-hidden");
        $(".visual-bg .line").removeClass("line-hidden");
      }
    },
    offset: "90%",
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

  let portfolioMbMenu = $(".portfolio-mb-menu");
  portfolioMbMenu.change(function () {
    let v = $(this).val();
    showSlide(v);
  });

  // 포트폴리오 데이터 호출
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
          <div class="port-cate-item swiper-slide" data-index="${index}">
            <div class="port-link">
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
                }" target="_blank" class="port-btn-reqular" style="color: #fff; background: #242A53;">Detail Page Design</a>
                <a href="${
                  item.webgit
                }" target="_blank" class="port-btn-reqular" style="color: #fff; background: #242A53;">Website Design</a>
              </div>
              <div class="port-mark">
                ${item.pc ? '<span class="port-mark-web">Web</span>' : ""}
                ${item.mb ? '<span class="port-mark-mob">Mobile</span>' : ""}
              </div>
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
        <div class="port-cate-item swiper-slide" data-index="${index}">
          <div class="port-link">
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
              }" target="_blank" class="port-btn-reqular" style="color: #fff; background: #242A53;">Detail Page Design</a>
              <a href="${
                item.webgit
              }" target="_blank" class="port-btn-reqular" style="color: #fff; background: #242A53;">Website Design</a>
            </div>
            <div class="port-mark">
              ${item.pc ? '<span class="port-mark-web">Web</span>' : ""}
              ${item.mb ? '<span class="port-mark-mob">Mobile</span>' : ""}
            </div>
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
          <div class="port-cate-item swiper-slide" data-index="${index}">
            <div class="port-link">
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
                }" target="_blank" class="port-btn-reqular" style="color: #fff; background: #242A53;">Detail Page Design</a>
                <a href="${
                  item.webgit
                }" target="_blank" class="port-btn-reqular" style="color: #fff; background: #242A53;">Website Design</a>
              </div>
              <div class="port-mark">
                ${item.pc ? '<span class="port-mark-web">Web</span>' : ""}
                ${item.mb ? '<span class="port-mark-mob">Mobile</span>' : ""}
              </div>
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

  let designMenuA = $(".design-menu a");
  designMenuA.eq(0).addClass("design-menu-active");
  $.each(designMenuA, function (index, item) {
    $(this).click(function (event) {
      event.preventDefault();
      designMenuA.removeClass("design-menu-active");
      $(this).addClass("design-menu-active");
      if (index == 0) {
        // 해당 슬라이드 번호로 이동
        // loop 라서 1번으로 처리
        designSw.slideTo(1);
      } else if (index == 1) {
        designSw.slideTo(2);
      } else if (index == 2) {
        designSw.slideTo(5);
      } else if (index == 3) {
        designSw.slideTo(8);
      }
    });
  });

  let designMbMenu = $(".design-mb-menu");
  designMbMenu.change(function () {
    let v = $(this).val();
    if (v == "branding") {
      // 해당 슬라이드 번호로 이동
      // loop 라서 1번으로 처리
      designSw.slideTo(1);
    } else if (v == "symbol") {
      designSw.slideTo(2);
    } else if (v == "edit") {
      designSw.slideTo(5);
    } else if (v == "drawing") {
      designSw.slideTo(8);
    }
  });

  let designSw = new Swiper(".design-sw", {
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

  designSw.on("activeIndexChange", function () {
    console.log(designSw.realIndex);
    designMenuA.removeClass("design-menu-active");
    // designSw의 realIndex가 해당 페이지로 이동할때
    // design menu 의 li에 포커싱 시키기
    if (designSw.realIndex == 0) {
      designMenuA.eq(0).addClass("design-menu-active");
    } else if (designSw.realIndex >= 1 && designSw.realIndex < 4) {
      designMenuA.eq(1).addClass("design-menu-active");
    } else if (designSw.realIndex >= 4 && designSw.realIndex < 7) {
      designMenuA.eq(2).addClass("design-menu-active");
    } else if (designSw.realIndex == 7) {
      designMenuA.eq(3).addClass("design-menu-active");
    }
  });

  function makeCircle(_id, _color, _point) {
    let bar = new ProgressBar.Circle(_id, {
      strokeWidth: 6,
      easing: "easeInOut",
      duration: 1400,
      color: _color,
      trailColor: "#323b70",
      trailWidth: 1,
      svgStyle: null,
    });
    bar.animate(_point);
  }

  let bar_html = makeCircle(pro1, "#ff7200", "0.95");
  let bar_css = makeCircle(pro2, "#2196f3", "0.90");
  let bar_js = makeCircle(pro3, "#ffd800", "0.50");
  let bar_jq = makeCircle(pro4, "#aaa", "0.65");
  let bar_vue = makeCircle(pro5, "#20dd88", "0.30");
  let bar_scss = makeCircle(pro6, "#ff62b1", "0.70");
  let bar_figma = makeCircle(pro7, "#62f1ff", "0.95");
  let bar_git = makeCircle(pro8, "#fff", "0.65");
  let bar_photo = makeCircle(pro9, "#00a9ff", "0.98");
  let bar_illust = makeCircle(pro10, "#ff9a00", "0.98");
  let bar_indesign = makeCircle(pro11, "#fd3365", "0.98");

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
    breakpoints: {
      0: {
        slidesPerView: 2,
        spaceBetween: 30,
        slidesPerGroup: 2,
      },

      531: {
        slidesPerView: 2,
        spaceBetween: 35,
        slidesPerGroup: 2,
      },

      631: {
        slidesPerView: 2,
        spaceBetween: 40,
        slidesPerGroup: 2,
      },

      751: {
        slidesPerView: 2,
        spaceBetween: 75,
        slidesPerGroup: 2,
      },

      // 750보다 클 경우
      901: {
        slidesPerView: 3,
        spaceBetween: 50,
        slidesPerGroup: 3,
      },

      // 1100보다 클 경우
      1101: {
        slidesPerView: 3,
        spaceBetween: 75,
        slidesPerGroup: 3,
      },

      // 1300보다 클 경우
      1301: {
        slidesPerView: 4,
        spaceBetween: 60,
        slidesPerGroup: 4,
      },

      // 1400보다 클 경우
      1401: {
        slidesPerView: 4,
        spaceBetween: 85,
        slidesPerGroup: 4,
      },
    },
  });
};

$(document).ready(function () {
  $(".contact-click").click(function () {
    $(".footer-item").addClass("footer-item-event");
    setTimeout(function () {
      $(".footer-item").removeClass("footer-item-event");
    }, 350);
  });

  // Gsap Onepage Scroll
  // let section = [
  //   "#visual",
  //   "#profile",
  //   "#portfolio",
  //   "#design",
  //   "#about",
  //   "#skills",
  // ];

  // let sectionSpeed = 500;
  // let sectionTotal = section.length;
  // let sectionPos = [];

  // $.each(section, function (index, item) {
  //   sectionPos[index] = Math.ceil($(item).offset().top);
  // });

  // $(window).scroll(function () {});

  // let sectionW = 1150;

  // $(window).resize(function () {
  //   // 계속 값을 업데이트 한다.
  //   $.each(section, function (index, item) {
  //     sectionPos[index] = Math.ceil($(item).offset().top);
  //   });

  //   let scY = Math.ceil($(window).scrollTop());

  //   for (let i = sectionTotal - 1; i > 0; i--) {
  //     let temp = sectionPos[i];
  //     if (scY > temp) {
  //       sectionIndex = i;
  //       break;
  //     }
  //   }

  //   let winWidth = $(window).width();

  //   if (winWidth <= sectionW) {
  //     $("html").css("overflow-y", "auto");
  //     wheelDefense = true;
  //   } else {
  //     wheelDefense = false;
  //     $("html").css("overflow", "hidden");
  //     gsap.to($("html"), sectionSpeed / 1000, {
  //       scrollTo: sectionPos[sectionIndex],
  //       onComplete: function () {
  //         scrollIng = false;
  //       },
  //     });
  //   }
  // });

  // gsap.to($("html"), sectionSpeed / 1000, {
  //   scrollTo: 0,
  //   onComplete: function () {
  //     scrollIng = false;
  //   },
  // });

  // let scrollIng = false;
  // let wheelDefense = true;
  // let sectionIndex = 0;

  // $(window).bind("mousewheel DOMMouseScroll", function (event) {
  //   if (wheelDefense == true) {
  //     return;
  //   }

  //   let distance = event.originalEvent.wheelDelta;

  //   if (distance == null) {
  //     distance = event.originalEvent.detail * -1;
  //   }
  //   if (scrollIng == true) {
  //     return;
  //   }

  //   scrollIng = true;

  //   if (distance < 0) {
  //     sectionIndex = sectionIndex + 1;
  //     if (sectionIndex >= sectionTotal - 1) {
  //       sectionIndex = sectionTotal - 1;
  //     }
  //   } else if (distance > 0) {
  //     sectionIndex = sectionIndex - 1;
  //     if (sectionIndex <= 0) {
  //       sectionIndex = 0;
  //     }
  //   }

  //   let scY = sectionPos[sectionIndex];

  //   gsap.to($("html"), sectionSpeed / 1000, {
  //     scrollTo: scY,
  //     onComplete: function () {
  //       scrollIng = false;
  //     },
  //   });
  // });

  // let tempW = $(window).width();

  // if (tempW <= sectionW) {
  //   $("html").css("overflow-y", "auto");
  //   wheelDefense = true;
  // } else {
  //   $("html").css("overflow", "hidden");
  //   wheelDefense = false;
  // }
});




// 포트폴리오 썸네일 클릭 시 팝업 오픈
$(document).on("click", ".port-link", function (e) {
  e.preventDefault();

  const index = $(this).closest(".port-cate-item").data("index");
  const item = allPortfolioData[index];

  if (!item || !item.images || item.images.length === 0) {
    openPortfolioPopup(null);
    return;
  }

  openPortfolioPopup(item.images);
});

function openPortfolioPopup(imageList) {
  const popup = $("#portfolio-popup");
  const inner = popup.find("ul");
  inner.html(""); // 초기화

  if (!imageList || imageList.length === 0) {
    inner.append(`<li><p>이미지가 없습니다.</p></li>`);
  } else {
    imageList.forEach(function (imgName) {
      const imgSrc = `./images/${imgName}`;
      inner.append(`<li><img src="${imgSrc}" alt=""></li>`);
    });
  }

  $("html, body").addClass("expand");
  $(".dim_bg").fadeIn();
  popup.fadeIn();
}

$(document).on("click", ".dim_bg", function () {
  $("#portfolio-popup").fadeOut();
  $(".dim_bg").fadeOut();
  $("html, body").removeClass("expand");
  $(window).scrollTop(scrollPosition);
});