import { doctorList } from "../script/data.js";
let visits = localStorage.getItem("visits");

if (visits) {
  let filterdData = [];

  doctorList.forEach((el) => {
      JSON.parse(visits).forEach((visit) => {
      if (visit.doctorId == el.id) {
        filterdData.push({ ...el, storageId: visit.id });
      }
    });
  });
  gridList(filterdData);
}

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
      window.location.href = `details.html?id=${el.id}&storageId=${el.storageId}`;
    });
    gridContainer.appendChild(doctorContainer);
  });
}
