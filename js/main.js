"use strict";
const mainHeader = document.querySelector(".main-header");
const hamburgerBtn = document.querySelector("#main-nav-button");
const hamburgerBtnImg = document.querySelector("#main-nav-button_img");
const mainNavigation = document.querySelector(".main-navigation");
const introSection = document.querySelector(".intro-section");
const portfolioImg = document.querySelector(
  ".portfolio-article__main--image-holder"
);
const backToTopBtn = document.querySelector("#back-to-top--btn");
const portfolioWrapper = document.querySelector(".portfolio-wrapper");
const introSectionWorkWrapper = document.querySelector(
  ".intro-section__work-wrapper"
);
const portfolioSection = document.querySelector(".portfolio-section");
const productPageSection = document.querySelector(".product-page__section");
const switchProductBtn = document.querySelectorAll(".switchProductBtn");
const aboutPage = document.getElementById("about");
const contactSection = document.getElementById("contact");
const navbarBtn = document.querySelectorAll(".navbarbtn");
const body = document.getElementsByTagName("body")[0];

let productsList = [];
let productsListMain = [];

/************** */

let productId = "";

function getProductId(e) {
  productId = e;
  localStorage.setItem("productIdKey", productId);
}
let b = localStorage.getItem("productIdKey") - 1;

/************** */

//***** PRODUCTS DISPLAY *****//
$.ajax({
  url: "portfolio.json",
  method: "get",
  dataType: "json",
}).done(function (res) {
  ddd(res);
});
//// PRODUCT PAGE DISPLAY SELECTED PRODUCT
function ddd(res) {
  if (document.title == "Dejan Budanovic | Product") {
    //const i = localStorage.getItem("productIdKey") - 1;
    displayProduct(res, b);
  }

  //// PRODUCT PAGE DISPLAY SELECTED PRODUCT END

  //// PORTFOLIO PAGE DISPLAY ALL PRODUCTS
  if (document.title == "Dejan Budanovic | Portfolio") {
    productsList.length = 0;
    for (let i = 0; i < res.length; i++) {
      let product = `<!-- Portfolio Article -->
   <a id="${res[i].id}" href="product.html" class="productBtn" onclick="getProductId(this.id)">
       <article class="portfolio-page__article">
         <div class="portfolio-page__article--img-wrapper">
           <img src="${res[i].imgSrc}.jpg"  alt="">
           <div class="overlay"></div>
         </div>
         <h3>${res[i].productTitle}</h3>
         <p>${res[i].productDescriptionShort}</p>
       </article>
     </a>
 <!-- Portfolio Article END -->`;
      productsList.push(product);
      portfolioWrapper.innerHTML = productsList.join("");
    }
  }
  //// PORTFOLIO PAGE DISPLAY ALL PRODUCTS END

  //// HOME PAGE INTRO SECTION DISPLAY LATEST
  if (document.title == "Dejan Budanovic | Home") {
    introSectionWorkWrapper.innerHTML = `<div class="intro-section__work-wrapper--img-wrapper">
    <img
      src="${res[0].imgSrc}.jpg"
      alt="${res[0].productTitle}"
    />
  </div>
  <div class="intro-section__work-wrapper--text-wrapper">
    <h3>My latest work</h3>
    <p>${res[0].productTitle} | ${res[0].productDescriptionShort} | ${res[0].year}</p>
    <div class="intro-section__work-wrapper--text-wrapper-arrow-holder">
      <a href="${res[0].productLink}">View site</a>
      <img src="./img/arrow-right.svg" alt="right arrow" />
      <span id="incomplete-circle"></span>
    </div>
  </div>`;
    //// HOME PAGE INTRO SECTION DISPLAY LATEST END

    //// HOME PAGE PORTFOLIO SECTION DISPLAY 3 PRODUCTS
    productsListMain.length = 0;
    for (let i = 0; i < 3; i++) {
      let product = `<div class="portfolio-article">
    <!-- Side Bar -->
    <div class="portfolio-article__sidebar">
      <h3>${res[i].id}</h3>
      <div class="portfolio-article__sidebar--description">
        <p>${res[i].productDescriptionShort}</p>
      </div>
    </div>
    <!-- Side Bar END -->
    <!--Portfolio Article Main -->
    <div class="portfolio-article__main">
      <div class="portfolio-article__main--image-holder">
        <img
          class="portfolio-article__main--image"
          src="${res[i].imgSrc}.jpg"
          alt="${res[0].productTitle}"
        />
      </div>
      <div class="portfolio-article__main--text-holder">
        <div class="portfolio-article__main--arrow-holder">
          <h4><a id="${res[i].id}" href="product.html" onclick="getProductId(this.id)">${res[i].productTitle}</a></h4>
          <img src="./img/arrow-right.svg" alt="right arrow" />
          <span id="incomplete-circle"></span>
        </div>
        <span>${res[i].productDescriptionShort}</span>
        <p>
        ${res[i].productDescriptionLong}
        </p>
        <a class="portfolio__view-site--button" href="${res[i].productLink}">view site</a>
      </div>
    </div>
    <!--Portfolio Article Main END -->
  </div>`;
      productsListMain.push(product);
      portfolioSection.innerHTML = productsListMain.join("");
    }
  }
}
//// HOME PAGE PORTFOLIO SECTION DISPLAY 3 PRODUCTS END

//***** PRODUCTS DISPLAY END *****//

function switchProduct(a) {
  $.ajax({
    url: "portfolio.json",
    method: "get",
    dataType: "json",
  }).done(function (res) {
    a = parseInt(a);
    b += a;
    if (b >= res.length) {
      b = 0;
    }
    if (b < 0) {
      b = res.length - 1;
    }
    displayProduct(res, b);
    localStorage.setItem("productIdKey", b + 1);
  });
}

function displayProduct(res, i) {
  productPageSection.innerHTML = `<!-- Product Page Text Wrapper -->
    <div class="product-page__text-wrapper" id="${res[i].id}">
      <h2>${res[i].productTitle}</h2>
      <div class="product-page__text-wrapper--description-wrapper">
        <div>
          <h4>Role</h4>
          <p>Lorem ipsum</p>
          <h4>Description</h4>
          <p>
          ${res[i].productDescriptionLong}
          </p>
        </div>
        <div>
          <h4>Year</h4>
          <p>${res[i].year}</p>
          <h4>View site</h4>
          <a href="${res[i].productLink}">Site</a>
          <h4>View github</h4>
          <a
            href="${res[i].productGitHubLink}"
            >Github</a
          >
        </div>
      </div>
    </div>
    <!-- Product Page Text Wrapper END -->
    <!-- Product Page Image wrapper -->
    <div class="product-page__text-wrapper--image-wrapper">
      <div class="product-img-desktop">
        <img
          src="${res[i].imgSrc}.jpg"
          alt="${res[i].productTitle} desktop"
          onclick="showModal(this)"
        />
      </div>
      <div class="product-img-mobile">
        <img
          src="${res[i].imgSrcMobile}.jpg"
          alt="${res[i].productTitle} mobile"
          onclick="showModal(this)"
        />
      </div>
    </div>
    <!-- Product Page Image wrapper END -->
    <!-- Product Page Button wrapper -->
    <div class="product-page__text-wrapper--button-wrapper">
          <div id="left-arrow" class="arrow-wrapper">
            <div class="arrow-holder">
              <img src="./img/arrow-left.svg" alt="left arrow" />
              <span id="incomplete-circle"></span>
            </div>
            <h4
              class="switchProductBtn"
              onclick="switchProduct('-1')"
              type="button"
              tabindex="0"
            >
              Previous product
            </h4>
          </div>
          <div id="right-arrow" class="arrow-wrapper">
            <h4
              class="switchProductBtn"
              onclick="switchProduct(+1)"
              type="button"
              tabindex="0"
            >
              Next product
            </h4>
            <div class="arrow-holder">
              <img src="./img/arrow-right.svg" alt="right arrow" />
              <span id="incomplete-circle"></span>
            </div>
          </div>
        </div>
    <!-- Product Page Button wrapper END -->`;
}

//INTRO SECTION BACKGROUND CHANGE
let backgrounds = ["cover-image-1.jpg", "cover-image-2.jpg"];
var i = 0;

if (document.title == "Dejan Budanovic | Home") {
  window.addEventListener("load", sss);
  window.addEventListener("resize", sss);

  var width = "";
  const myInterval = setInterval(aaa, 7000);

  function aaa() {
    introSection.style.backgroundImage = `url(/img/${width}/${backgrounds[i]})`;
    i++;
    if (i == undefined || i >= backgrounds.length) {
      i = 0;
    }
    console.log(width);
    setTimeout(ccc, 1000);
  }

  function ccc() {
    introSection.style.transition = " ease-in 3s";
  }

  function sss() {
    if (window.innerWidth > 746) {
      width = "desktop";
    } else {
      width = "mobile";
    }
    if (document.title == "Dejan Budanovic | Home" && window.innerWidth > 746) {
      //clearInterval(myInterval);
      introSection.style.backgroundImage = `url(/img/${width}/${backgrounds[1]})`;
      myInterval;
      //introSection.style.transition = "background-image ease-in 3s";
    } else if (
      document.title == "Dejan Budanovic | Home" &&
      window.innerWidth <= 746
    ) {
      //clearInterval(myInterval);
      introSection.style.backgroundImage = `url(/img/${width}/${backgrounds[1]})`;
      myInterval;
      //setTimeout (introSection.style.transition = "background-image ease-in 3s",500)
    }
    console.log(width);
  }
}

//INTRO SECTION BACKGROUND CHANGE END

//NAVBAR COLOR CHANGE
window.onscroll = function () {
  navBarChangeColor();
};

function navBarChangeColor() {
  if (document.body.scrollTop > 71 || document.documentElement.scrollTop > 71) {
    mainHeader.style.background = "var(--dark-blue)";
  } else {
    mainHeader.style.background = "transparent";
  }
}
//NAVBAR COLOR CHANGE END

//CONTACT NAV BTN COLOR CHANGE WHEN IN VIEWPORT

var isInViewport = function (elem) {
  var bounding = elem.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
};

function checkDocumentFocus() {
  if (isInViewport(contactSection)) {
    aboutPage.classList.add("contact");
    aboutPage.classList.remove("about");
  } else {
    aboutPage.classList.add("about");
    aboutPage.classList.remove("contact");
  }
}

if (document.title == "Dejan Budanovic | About/Contact") {
  setInterval(checkDocumentFocus, 1);
}

//CONTACT NAV BTN COLOR CHANGE WHEN IN VIEWPORT END

//MOBILE MENU DISPLAY/HIDE

hamburgerBtn.addEventListener("click", toggleMenu);

navbarBtn.forEach((element) => {
  element.addEventListener("click", toggleMenu);
});

function toggleMenu() {
  hamburgerBtnImg.classList.toggle("closeBtn");
  mainNavigation.classList.toggle("main-navigation_show");
  //body.classList.toggle("scroll-hidden");
}
//MOBILE MENU DISPLAY/HIDE END

//PORTFOLIO IMAGE FADE OUT/IN ON SCROLL
function fadeOutOnScroll(element) {
  if (!element) {
    return;
  }

  var distanceToTop = window.pageYOffset + element.getBoundingClientRect().top;
  var elementHeight = element.offsetHeight;
  var scrollTop = document.documentElement.scrollTop;

  var opacity = 1;

  if (scrollTop > distanceToTop) {
    opacity = 1 - (scrollTop - distanceToTop + 120) / elementHeight;
  }

  if (opacity >= 0) {
    element.style.opacity = opacity;
  }
}

function scrollHandler() {
  fadeOutOnScroll(portfolioImg);
  backToTopBtnDisplay();
}

window.addEventListener("scroll", scrollHandler);
//PORTFOLIO IMAGE FADE OUT/IN ON SCROLL END

//BACK TO TOP BUTTON
function backToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function btnHide() {
  backToTopBtn.style.visibility = "hidden";
  backToTopBtn.style.opacity = "0";
}

function backToTopBtnDisplay() {
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    backToTopBtn.style.visibility = "visible";
    backToTopBtn.style.opacity = "1";
    setTimeout(btnHide, 3000);
  } else {
    btnHide();
  }
}

backToTopBtn.addEventListener("click", backToTop);
//BACK TO TOP BUTTON END

// Kontakt forma
$("#contact-form").validate({
  submitHandler: function (form) {
    // Uzimanje podataka iz forme
    var data = $(form).serialize();

    // Uzimanje vrednosti iz action atributa
    var action = $(form).prop("action");

    // Onemogućavanje svih polja
    $("input, textarea, button").prop("disabled", true);
    // Promena natpisa na dugmetu
    $(form).find("button").text("Sending...");

    // Slanje podataka iz forme putem AJAX metode
    $.post(action, data, function (response) {
      console.log(response);
      if (response == 1) {
        //HIDE FORM
        $(form).slideUp(function () {
          $(this).remove();
        });
        //MESSAGE SENT
        $(".alert-success").slideDown();
      } else if (response != "") {
        //MESSAGE ERROR
        alert(response);
      } else {
        alert("Failed to connect to server");
      }
    });
  },
});

function btnEnable() {
  document.querySelector(".submit-btn").disabled = false;
}

const modal = document.querySelector("#myModal");
const modalImg = document.querySelector(".modal-img");
const span = document.getElementsByClassName("close")[0];
function showModal(d) {
  modal.style.display = "block";
  modalImg.src = d.getAttribute("src");
}
if (document.body.id == "product") {
  span.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
