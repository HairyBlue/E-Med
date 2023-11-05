import { doctorList } from "../script/data.js";

  const id = new URLSearchParams(window.location.search).get("id");
  const mainContainer = document.querySelector(".main__container");
  const doctorContainer = document.querySelector(".main__doctor--list");
  const bioContent = document.querySelector(".bio");

  doctorList.forEach((el) => {
    if (el.id == id) {
      const imgContainer = document.createElement("div");
      const infoContainer = document.createElement("div");
      const img = document.createElement("img");
      const names = document.createElement("span");
      const specialist = document.createElement("span");
      const experience = document.createElement("span");
      const saveButton = document.createElement("div");
      const bio = document.createElement("p");

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

      saveButton.textContent = "Save";
      saveButton.classList.add("save");

      infoContainer.append(names, specialist, experience);

      doctorContainer.append(imgContainer, infoContainer);
      bioContent.appendChild(bio);
      mainContainer.appendChild(saveButton);

      saveButton.addEventListener("click", () => {
        const main = document.querySelector("main");
        const popup = document.createElement("div");
        const span = document.createElement("span");
        const textArea = document.createElement("textarea");
        const action = document.createElement("div");
        const skip = document.createElement("span");
        const save = document.createElement("span");

        popup.classList.add("popup");
        span.textContent = "Add Details";
        textArea.setAttribute("id", "details");
        textArea.setAttribute("cols", "30");
        textArea.setAttribute("rows", "10");

        action.classList.add("popup__action");
        skip.classList.add("popup__action--skip");
        save.classList.add("popup__action--save");

        skip.textContent = "Cancel";
        save.textContent = "Done";

        action.append(skip, save);
        popup.append(span, textArea, action);
        main.appendChild(popup);

        save.addEventListener("click", () => {
          if (textArea.value.trim().length < 10) {
            const toDestroy = document.querySelector(".error-msg");
            if (toDestroy) {
              toDestroy.remove();
            }
            const errorMessage = document.createElement("span");
            setTimeout(() => {
              errorMessage.classList.add("error-msg");
              errorMessage.textContent = "Please add a proper details";
              errorMessage.style.textAlign = "center";
              errorMessage.style.fontSize = "16px";
            }, 100);
            popup.appendChild(errorMessage);
            return;
          }
          const storage = JSON.parse(localStorage.getItem("visits"));
          const local = {
            id: storage.length + 1,
            doctorId: id,
            details: textArea.value.trim(),
          };
          storage.push(local);
          localStorage.setItem("visits", JSON.stringify(storage));
          window.location.href = "index.html";
        });
        skip.addEventListener("click", () => {
          popup.remove();
        });
      });
    }
  });

