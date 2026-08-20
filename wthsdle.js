let teachers = [];
let secrectTeacher = null; 
const guess = document.querySelector('#guess');
const displayAttempt = document.querySelector('#attempts');
const teacherName = document.querySelector('#teacherName');
const teacherSelect = document.querySelector('#teacher-select');
const guessForm = document.querySelector('#guessForm');
const profile = document.querySelector('#profile');
const attemptDisplay = document.querySelector('#attemptDisplay');
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
    profile.src = 'Images/maleProfile.jpg'; 
   } else {
    profile.src = 'Images/femaleProfile.png';  
}

    
  if (attempts === 3 || attempts === 5) {
   displayAttempt.classList.add('winner');
   } else {
   displayAttempt.classList.remove('winner');
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
	
	const selectedTeacher = teacherSelect.value; 
	
	const guessedTeacher = (teacher => teacher.id === selectedTeacher); 
}


 guessForm.addEventListener('submit', addAttempt); 
 
 