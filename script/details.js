import { doctorList } from "../script/data.js";
const storage = localStorage.getItem("visits");

const id = new URLSearchParams(window.location.search).get("id");
const storageId = new URLSearchParams(window.location.search).get("storageId");
const doctorContainer = document.querySelector(".main__doctor--list");
const bioContent = document.querySelector(".bio");
const detailsContent = document.querySelector(".details");

doctorList.forEach((el) => {
  if (el.id == id) {
    const imgContainer = document.createElement("div");
    const infoContainer = document.createElement("div");
    const img = document.createElement("img");
    const names = document.createElement("span");
    const specialist = document.createElement("span");
    const experience = document.createElement("span");
    const bio = document.createElement("p");
    const details = document.createElement("p");

    imgContainer.classList.add("profile-pic");
    infoContainer.classList.add("profile-info");
    names.classList.add("name");
    specialist.classList.add("specialist");
    experience.classList.add("experience");
    bio.classList.add("bio");

    img.setAttribute("src", el?.img);
    img.setAttribute("alt", el?.name);
    img.setAttribute("loading", "lazy");

    imgContainer.appendChild(img);

    names.textContent = `Dr. ${el?.name}`;
    specialist.textContent = el?.specialist;
    experience.textContent = `${el?.experience} years of experience`;

    bio.textContent = el?.bio;

    JSON.parse(storage).forEach((stored) => {
      if (stored.id == storageId) {
        details.textContent = stored.details;
      }
    });

    infoContainer.append(names, specialist, experience);

    doctorContainer.append(imgContainer, infoContainer);
    bioContent.appendChild(bio);
    detailsContent.appendChild(details);
  }
});
