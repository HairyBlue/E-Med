import { doctorList } from "../script/data.js";

if (!localStorage.getItem("visits")) localStorage.setItem("visits", JSON.stringify([]));

let filterdData = [];
let categoryName = "";
const searchInput = document.querySelector("#search");
const category = document.querySelectorAll(".main__category--list");

searchInput.addEventListener("input", (e) => {
  filterdData = [];
  let value = e.target.value;
  category.forEach((remove) => {
    remove.style.border = "none";
  });
  if (value.length == 0) filterdData.push(...doctorList);
  else
    doctorList.forEach((el) => {
      if (el.name.toLowerCase().includes(value.toLowerCase().trim()) || el.name.toLowerCase() == value.toLowerCase().trim()) {
        filterdData.push(el);
        return;
      }
      return;
    });

  gridList(filterdData);
});

category.forEach((e) => {
  const span = e.querySelector("span");

  e.addEventListener("click", () => {
    filterdData = [];
    let value = span.textContent.trim().toLowerCase();
    category.forEach((remove) => {
      remove.style.border = "none";
    });

    if (categoryName !== value)
      doctorList.forEach((el) => {
        if (value == el.category.toLowerCase()) {
          e.style.border = "2px solid #60a5fa";
          categoryName = value;
          filterdData.push(el);
          return;
        }
        return;
      });
    else {
      categoryName = "";
      filterdData.push(...doctorList);
    }
    gridList(filterdData);
  });
});

function gridList(data) {
  const gridContainer = document.querySelector(".main__doctor--slide");
  const doctorsList = document.querySelectorAll(".main__doctor--list");

  if (doctorsList) {
    doctorsList.forEach((e) => {
      e.remove();
    });
  }
  data.forEach((el) => {
    const doctorContainer = document.createElement("div");
    const imgContainer = document.createElement("div");
    const infoContainer = document.createElement("div");
    const img = document.createElement("img");
    const names = document.createElement("span");
    const specialist = document.createElement("span");
    const experience = document.createElement("span");

    doctorContainer.classList.add("main__doctor--list");
    imgContainer.classList.add("profile-pic");
    infoContainer.classList.add("profile-info");
    names.classList.add("name");
    specialist.classList.add("specialist");
    experience.classList.add("experience");

    img.setAttribute("src", el?.img);
    img.setAttribute("alt", el?.name);
    img.setAttribute("loading", "lazy");

    imgContainer.appendChild(img);

    names.textContent = `Dr. ${el?.name}`;
    specialist.textContent = el?.specialist;
    experience.textContent = `${el?.experience} years of experience`;

    infoContainer.append(names, specialist, experience);

    doctorContainer.append(imgContainer, infoContainer);

    doctorContainer.addEventListener("click", () => {
      window.location.href = `about.html?id=${el.id}`;
    });
    gridContainer.appendChild(doctorContainer);
  });
}

gridList(doctorList);
