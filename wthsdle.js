let teachers = [];
let secrectTeacher = null; 
const guess = document.querySelector('#guess');
const displayAttempt = document.querySelector('#attempts');
const teacherName = document.querySelector('#teacherName');
const teacherSelect = document.querySelector('#teacher-select');
const guessForm = document.querySelector('#guessForm');
const profile = document.querySelector('#profile');
const attemptDisplay = document.querySelector('#attemptDisplay');
const department = document.querySelector('#department');
const gender = document.querySelector('#gender');
const hallway = document.querySelector('#hallway');
const name = document.querySelector('#name');
let attempts = 1;
const maxAttempts = 5;

fetch('teachers.json')
  .then(response => response.json())
  .then(data => {
    teachers = data;
    initGame();
  })

teacherSelect.addEventListener('change', () => {
  if (teacherSelect.selectedIndex === 0) {
    guess.disabled = true;
  } else {
    guess.disabled = false;
  }
});


function addAttempt(event) {
	event.preventDefault();
	
	if (attempts >= maxAttempts) {
		endGame();
	} else {	
	attempts++;
	displayAttempt.textContent = `Attempt: ${attempts}/${maxAttempts}`;
	}
	
if (attempts === 3 || attempts === 4) {
		displayAttempt.style.color = '#A29C07';
	} else if (attempts === 5) {
		displayAttempt.style.color = '#B51C1C';
	}
	
	const selectedOption = teacherSelect.options[teacherSelect.selectedIndex];
	teacherName.textContent = selectedOption.text;
	
	if (selectedOption.text.includes('Mr.')) {
    profile.src = 'images/maleProfile.jpg'; 
   } else {
    profile.src = 'images/femaleProfile.png';  
}

   department.textContent = guessedTeacher.department;

    
  if (attempts === 3 || attempts === 5) {
   displayAttempt.classList.add('winner');
   } else {
   displayAttempt.classList.remove('winner');
 }
 
 const selectedId = teacherSelect.value;
const guessedTeacher = teachers.find(t => t.id === selectedId);

if (guessedTeacher) {
  department.textContent = guessedTeacher.department;
  gender.textContent = guessedTeacher.gender;
  hallway.textContent = guessedTeacher.hallway;
  name.textContent = guessedTeacher.name;
}
}

function initGame() {
	teacherSelect.innerHTML = '<option value="" disabled selected>Select a Teacher...</option>';
	
	teachers.sort((a,b) => {
		return a.name.localeCompare(b.name); 
	});
	
	teachers.forEach(teacher => {
		const option = document.createElement('option');
		
		option.value = teacher.id;
		option.textContent = teacher.name; 

        teacherSelect.appendChild(option); 		
	});
	
}


 guessForm.addEventListener('submit', addAttempt); 
 
 