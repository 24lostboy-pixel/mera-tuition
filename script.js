
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Filter notes by class and subject
function filterNotes() {
  const selectedClass = document.getElementById("notesClass").value;
  const selectedSubject = document.getElementById("notesSubject").value;
  const cards = document.querySelectorAll("#notesGrid .resource-card");
  let visibleCount = 0;

  cards.forEach((card) => {
    const matchesClass =
      selectedClass === "all" || card.dataset.class === selectedClass;

    const matchesSubject =
      selectedSubject === "all" ||
      card.dataset.subject === selectedSubject;

    const visible = matchesClass && matchesSubject;
    card.hidden = !visible;

    if (visible) visibleCount++;
  });

  document.getElementById("notesEmpty").hidden = visibleCount > 0;
}

// Filter PYQs by class, subject and exam
function filterPYQs() {
  const selectedClass = document.getElementById("pyqClass").value;
  const selectedSubject = document.getElementById("pyqSubject").value;
  const selectedExam = document.getElementById("pyqExam").value;
  const cards = document.querySelectorAll("#pyqGrid .resource-card");
  let visibleCount = 0;

  cards.forEach((card) => {
    const matchesClass =
      selectedClass === "all" || card.dataset.class === selectedClass;

    const matchesSubject =
      selectedSubject === "all" ||
      card.dataset.subject === selectedSubject;

    const matchesExam =
      selectedExam === "all" || card.dataset.exam === selectedExam;

    const visible = matchesClass && matchesSubject && matchesExam;
    card.hidden = !visible;

    if (visible) visibleCount++;
  });

  document.getElementById("pyqEmpty").hidden = visibleCount > 0;
}

// Run filters whenever a selection changes
["notesClass", "notesSubject"].forEach((id) => {
  document.getElementById(id).addEventListener("change", filterNotes);
});

["pyqClass", "pyqSubject", "pyqExam"].forEach((id) => {
  document.getElementById(id).addEventListener("change", filterPYQs);
});

// Update the footer year automatically
document.getElementById("year").textContent = new Date().getFullYear();

// Prevent unfinished PDF links from jumping to the top of the page
