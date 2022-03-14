const initSwipe = () => {
  try {
    let swiper = new Swiper(".mySwiper", {
      pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
      },
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  } catch (error) {
    console.log(`error`, error);
  }
};

initSwipe();

const uploadPhotoProfile = () => {
  try {
    let currentImage = document.querySelector(".photoProfile");
    document.querySelector("#uploadFile").addEventListener("change", () => {
      const MAX_SIZE = 6000000;

      const uploadFile = document.querySelector("#uploadFile").files[0];
      if (uploadFile > MAX_SIZE) return;
      else {
        const reader = new FileReader();
        reader.onloadend = () => (currentImage.src = reader.result);
        reader.readAsDataURL(uploadFile);
      }
    });

    document.querySelector("#login").addEventListener("click", () => {
      const divInfoUser = document.querySelector(".user-info");
      const urlToSet = currentImage.getAttribute("src");
      const name = document.querySelector("#name").value;
      console.log(`name`, name);
      const lastName = document.querySelector("#lastName").value;
      console.log(`name`, lastName);
      const email = document.querySelector("#email").value;
      console.log(`name`, email);
      divInfoUser.innerHTML = `<img class="photo-profile-procesed" src ="${urlToSet}"/>
      <div class="hide-content">
        <p class="name-user">${name} ${lastName}</p>
        <p class="email-user">${email}</p>
        <p class="logout">Salir</p>
      </div>
      `;
      document.querySelector(".logout").addEventListener("click", () => {
        window.location.reload();
      });
    });
  } catch (error) {
    console.log(`error`, error);
  }
};

uploadPhotoProfile();

const animationBuy = () => {
  try {
    document.querySelectorAll(".buy-course").forEach((x) =>
      x.addEventListener("click", () => {
        console.log(`888`, 888);
        const button = document.querySelector(".buy-course");
        const cart = document.querySelector(".cart");
        const cartTotal = cart.getAttribute("data-totalitems");
        const newCartTotal = parseInt(cartTotal) + 1;

        button.classList.add("sendtocart");
        setTimeout(function () {
          button.classList.remove("sendtocart");
          cart.classList.add("shake");
          cart.setAttribute("data-totalitems", newCartTotal);
          setTimeout(function () {
            cart.classList.remove("shake");
          }, 500);
        }, 1000);
      })
    );
  } catch (error) {
    console.log(`error`, error);
  }
};

animationBuy();

const addListBuy = (itemBuy) => {
  try {
    const cart = document.querySelector(".cart");

    cart.addEventListener("click", () => {
      const loginHeader = document.querySelector("#loginHeader");
      if (loginHeader) {
        console.log(`888`, 888);
        loginHeader.click();
      } else {
        console.log(`444`, 444);

        const validateItems = cart.getAttribute("data-totalitems");
        if (validateItems > 0) {
          const containModal = `

                <div class="hide-content">

                <h5 class="text-center my-4">Lista de cursos</h5>
                ${itemBuy
                  .map(
                    (item) => `
                    <div class="item">
                      <div class="left">
                      <img src=${item.src} class="item-image"/>
                      </div>
                      <div class="right">
                        <p>${item.title}</p>
                        <p>$${item.price}</p>
                        <p>${item.schedule ? item.schedule : ""} </p>
                      </div>
                    </div>`
                  )
                  .join(" ")}

         `;
          const modalContainer = document.querySelector(".contain-modal");
          const showModal = document.querySelector("#buyModal");
          modalContainer.innerHTML = containModal;
          showModal.style.display = "block";
        }
      }
    });
  } catch (error) {
    console.log(`error`, error);
  }
};
// addListBuy();

const confirm = (itemBuy) => {
  console.log(`845`, 845);
  console.log(`itemBuy`, itemBuy);
  let suma = 0;

  const buyModal = document.querySelector(".contain-modal2");
  for (let i = 0; i < itemBuy.length; i++) {
    suma += parseInt(itemBuy[i].price);
    console.log(`suma`, suma);
  }
  if (itemBuy[0].schedule) {
    const busqueda = itemBuy.reduce((acc, curso) => {
      acc[curso.schedule] = ++acc[curso.schedule] || 0;
      return acc;
    }, {});

    const duplicados = itemBuy.filter((curso) => {
      return busqueda[curso.schedule];
    });

    console.log(`duplicados`, duplicados);

    // const divSuccess = document.createElement("div");
    // divSuccess.innerHTML = `
    // <div>
    //   <p>La suma de los cursos es: $${suma}
    //   <p>No hay cruce de horarios</p>
    //   <a id="pay">Paga aquí</a>
    // </div>
    // `;
    // const divFail = document.createElement("div");
    // divFail.innerHTML = `
    // <div>
    //  Se presenta cruce de horarios
    // </div>
    // `;

    // const neww = validateHorarios.indexOf();
    if (duplicados.length > 0) {
      buyModal.innerHTML = `  
    <div class="fail">
      <img src="../images/icons/fail.png"/>
      <p>Se presenta cruce de horarios</p>
     </div>
    `;
      console.log("Hay cruce de horarios");
    } else {
      console.log("perfecto");
      buyModal.innerHTML = `
    <div class="check">
      <img src="../images/icons/check.png"/>
    <div class="right">
      <p>La suma de los cursos es: $${suma}
      <p>No hay cruce de horarios</p>
      <a id="pay">Paga aquí</a>
    </div>
  </div>
    `;
    }
  } else {
    buyModal.innerHTML = `
    <div class="check">
      <img src="../images/icons/check.png"/>
    <div class="right">
      <p>La suma de los cursos es: $${suma}
      <p>No hay cruce de horarios</p>
      <a id="pay">Paga aquí</a>
    </div>
  </div>
    `;
  }
  // const sum = itemBuy.forEach((element) => {
  //   console.log(`itemBuy.price`, element.price);
  //   let convert = parseInt(element.price);
  //   console.log(`convert`, convert);
  //   suma = convert++;
  //   console.log(`suma`, suma);
  // });
};

const closeModal = () => {
  const showModal = document.querySelector("#buyModal");

  window.onclick = function (event) {
    if (event.target == showModal) {
      showModal.style.display = "none";
    }
  };
};
closeModal();
const extractInfoBuy = (e) => {
  try {
    const buyCourse = document.querySelectorAll(".buy-course");
    const arrayItems = [];
    const itemBuy = {};
    const itemBuyArray = [];

    // buyCourse.forEach((element) => {
    //   element.addEventListener("click", (e) => {
    const card = e.path[2];
    console.log(`card`, card);
    const title = card.querySelector(".card-title").innerText;
    const price =
      card.querySelector(".list-group-flush").childNodes[5].innerText;
    if (card.querySelector(".list-group-flush").childNodes[7]) {
      const schedule =
        card.querySelector(".list-group-flush").childNodes[7].innerText;
      itemBuy.schedule = schedule;
    }

    let src = card.querySelector("img");
    src = src.getAttribute("src");
    console.log(`src`, src);
    itemBuy.title = title;
    itemBuy.price = price;

    itemBuy.src = src;

    return itemBuy;
  } catch (error) {
    console.log(`error`, error);
  }
};
//extractInfoBuy();

const testFun = () => {
  try {
    const itemBuyArray = [];

    const buyCourse = document.querySelectorAll(".buy-course");
    buyCourse.forEach((element) => {
      element.addEventListener("click", (e) => {
        const test = extractInfoBuy(e);
        itemBuyArray.push(test);
        console.log(`itemBuyArray`, itemBuyArray);
        addListBuy(itemBuyArray);
        confirm(itemBuyArray);
      });
    });
  } catch (error) {}
};
testFun();

// const openModalBuy = () => {
//   try {
//     const referenteToInsert = document.querySelector(".list-items");
//     console.log(`referenteToInsert`, referenteToInsert);
//     console.log(`555`, 555);
//     const div = document.createElement("div");
//     const containModal = ``;
//     div.innerHTML = containModal;

//     referenteToInsert.appendChild(div);
//   } catch (error) {
//     console.log(`error`, error);
//   }
// };
