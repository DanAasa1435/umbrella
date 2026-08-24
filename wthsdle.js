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
const lastName = document.querySelector('#lastName');
const winnerInfo = document.querySelector('#winnerInfo');
const winnerScreen = document.querySelector('#winnerScreen');
const loserInfo = document.querySelector('#loserInfo');
const loserScreen = document.querySelector('#loserScreen');
let attempts = 0;
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

	displayAttempt.textContent = `Attempt: ${attempts}/${maxAttempts}`;
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
 
 const selectedId = teacherSelect.value;
const guessedTeacher = teachers.find(t => String(t.id) === String(selectedId));

if (guessedTeacher) {
  department.textContent = guessedTeacher.department;
  gender.textContent = guessedTeacher.gender;
  hallway.textContent = guessedTeacher.hallway;
  lastName.textContent = guessedTeacher.lastName;
}

 const coloredBoxes = [
 { element: department, guessed: guessedTeacher.department, secrect: secrectTeacher.department },
 { element: gender, guessed: guessedTeacher.gender, secrect: secrectTeacher.gender },
 { element: hallway, guessed: guessedTeacher.hallway, secrect: secrectTeacher.hallway },
 { element: lastName, guessed: guessedTeacher.lastName, secrect: secrectTeacher.lastName}
]	 

 coloredBoxes.forEach(select => {
	 if (select.guessed === select.secrect) {
		select.element.classList.add('correct');
        select.element.classList.remove('incorrect'); 
	 } else {
		 select.element.classList.remove('correct');
        select.element.classList.add('incorrect'); 
	 }
 });

  // Returns true if EVERY attribute box matches green
  const isAllAttributesMatch = coloredBoxes.every(box => box.guessed === box.secrect);

  // CHANGE: Pass guessedTeacher into endGame when winning
  if (guessedTeacher.id === secrectTeacher.id || isAllAttributesMatch) {
    setTimeout(() => {
      endGame(true, guessedTeacher);
    }, 1000); 
    return; 
  }
	
  // CHANGE: Pass guessedTeacher into endGame when losing
  if (attempts === maxAttempts) {
    setTimeout(() => {
      endGame(false, guessedTeacher);
    }, 1000);
    return;
  } 	
	
  attempts++;
}


// CHANGE: Updated endGame to take guessedTeacher as a second parameter
function endGame(isWin, guessedTeacher) {
	guess.disabled = true;
	teacherSelect.disabled = true;
	
	if (isWin) {
	  // CHANGE: If all 4 attributes match but it's a twin/alternate teacher, display the guessed teacher's name!
	  if (guessedTeacher && guessedTeacher.id !== secrectTeacher.id) {
	    winnerInfo.textContent = `The mystery teacher was ${guessedTeacher.name}!`;
	  } else {
	    winnerInfo.textContent = `The person was ${secrectTeacher.name}!`;
	  }
	  winnerScreen.classList.remove('hidden');
	
	} else {
	  loserInfo.textContent = `The person was ${secrectTeacher.name}!`;
      loserScreen.classList.remove('hidden');	  
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
	
	const randomTeacher = Math.floor(Math.random() * teachers.length);
	secrectTeacher = teachers[randomTeacher];
	
	
}


 guessForm.addEventListener('submit', addAttempt);
