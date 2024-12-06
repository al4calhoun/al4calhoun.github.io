/**
 * @description Array of calendar events
 * @param {{hdate: string, calendarEvents: string, description:string}} calendarEvents
 **/
const calendarEvents = [
    {
      hdate: "28-11-2024",
      calendarEvents: "Thanksgiving",
      description: "Time to give thanks.",
    },
    {
      hdate: "24-12-2024",
      calendarEvents: "Christmas Eve",
      description: "Closing early at 3PM.",
    },
    {
      hdate: "25-12-2024",
      calendarEvents: "Christmas",
      description: "All retail sales closed.",
    },
    {
      hdate: "01-01-2025",
      calendarEvents: "New Year's Day",
      description: "Closed - Private Party.",
    },
    {
      hdate: "14-02-2025",
      calendarEvents: "Valentine's Day",
      description: "Sign up for our romantic couples package with cocktails and a 5 course gourmet meal.",
    },
    {
      hdate: "15-02-2025",
      calendarEvents: "57th Annual Swap Meet",
      description: "Antiques, car show, vendors, arts, food trucks, and crafts.",
    },
    {
      hdate: "16-02-2025",
      calendarEvents: "57th Annual Swap Meet",
      description: "Antiques, car show, vendors, arts, food trucks, and crafts.",
    },
  ];


/** 
 * @description Calendar HTML Element 
 * @typedef {HTMLElement} calendar
 **/ 
const calendar = document.querySelector("#calendar");

/** 
 * @description Month HTML Element
 * @typedef {HTMLElement} monthBanner
 **/ 
const monthBanner = document.querySelector("#month");

/** 
 * @description Int to keep track of navigation
 * @type {number} navigation
 **/ 
let navigation = 0;

/** 
 * @description Boolean for if clicked or not
 * @type {boolean} clicked
 **/ 
let clicked = null;

/** 
 * @param {Array} weekdays 
 * @description Array of the days of the week
 **/ 
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


/** 
 * @function loadCalendar loads calendar on HTML page
 **/ 
function loadCalendar() {
  const dt = new Date();

  if (navigation != 0) {
    dt.setMonth(new Date().getMonth() + navigation);
  }
  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();
  monthBanner.innerText = `${dt.toLocaleDateString("en-us", {
    month: "long",
  })} ${year}`;
  calendar.innerHTML = "";
  const dayInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayofMonth = new Date(year, month, 1);
  const dateText = firstDayofMonth.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const dayString = dateText.split(", ")[0];
  const emptyDays = weekdays.indexOf(dayString);

  for (let i = 1; i <= dayInMonth + emptyDays; i++) {
    const dayBox = document.createElement("div");
    dayBox.classList.add("day");
    const monthVal = month + 1 < 10 ? "0" + (month + 1) : month + 1;
    const dateVal = i - emptyDays < 10 ? "0" + (i - emptyDays) : i - emptyDays;
    const dateText = `${dateVal}-${monthVal}-${year}`;
    if (i > emptyDays) {
      dayBox.innerText = i - emptyDays;
      //Event Day
      const eventOfTheDay = calendarEvents.find((e) => e.hdate == dateText);

      if (i - emptyDays === day && navigation == 0) {
        dayBox.id = "currentDay";
      }

      if (eventOfTheDay) {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("calendarEvents");
        eventDiv.innerText = eventOfTheDay.calendarEvents;
        dayBox.appendChild(eventDiv);
      }

      dayBox.addEventListener("click", () => {
        showModal(dateText);
      });
    } else {
      dayBox.classList.add("plain");
    }
    calendar.append(dayBox);
  }
} //end load calendar




/** @description Function that adds eventlisteners for back, next, and modal window buttons */
function buttons() {
  const btnBack = document.querySelector("#btnBack");
  const btnNext = document.querySelector("#btnNext");
  const closeButtons = document.querySelectorAll(".btnClose");


  btnBack.addEventListener("click", () => {
    navigation--;
    loadCalendar();
  });
  btnNext.addEventListener("click", () => {
    navigation++;
    loadCalendar();
  });
  modal.addEventListener("click", closeModal);
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });
}

/**
 * @description modal html element
 *
 * @type {HTMLElement} modal
 */
const modal = document.querySelector("#modal");
/**
 * @description html element that views the event form
 *
 * @type {HTMLElement} viewEventForm
 */
const viewEventForm = document.querySelector("#viewEvent");

/**
 * @description shows modal window of calendar event that was selected
 *
 * @param {boolean} dateText
 **/
function showModal(dateText) {
  clicked = dateText;
  const eventOfTheDay = calendarEvents.find((e) => e.hdate == dateText);
  if (eventOfTheDay) {
    document.querySelector("#eventText").innerText = eventOfTheDay.calendarEvents;
    document.querySelector("#eventDate").innerText = eventOfTheDay.hdate;
    document.querySelector("#eventDescription").innerText = eventOfTheDay.description;
    viewEventForm.style.display = "block";
  } 
}

/** @description close modal html element that is showing calendar event **/
function closeModal() {
  viewEventForm.style.display = "none";
  modal.style.display = "none";
  clicked = null;
  loadCalendar();
}

buttons();
loadCalendar();
