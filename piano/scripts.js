$(function() {

// 	$('[data-keyboard="83"]').trigger('click');

	var audioFiles = $('audio');
	console.log(audioFiles);

	$('.key').on('mousedown keydown', function(e) {
		e.stopPropagation();

		console.log("You pressed a key!");
		$(this).addClass('keydown');

		var pressedKey = $(this).data('key');
		var audioFile = $(this).data('sound');
		
		if ($('#octaveUp').prop('checked')) {
			octaveUp(pressedKey, audioFiles);
		} else if ($('#octaveDown').prop('checked')) {
			octaveDown(pressedKey, audioFiles);
		} else {
			playSound(pressedKey);
		}

		if ($('#arpeggio').prop('checked')) {
				arpeggiate(pressedKey, audioFiles);
		}


	}).on('mouseup',function(){
		$(this).removeClass('keydown');
	}); // end mousedown/mouseup listeners


	// function definitions
	function playSound(pressedKey) {
		// if the requested sound is already being played
		// stop it, then play it again
		console.log(pressedKey);
		// select the audio element with the key of pressedKey
		var sound = $('[data-sound="'+ pressedKey +'"]')[0];
		sound.currentTime = 0.25;
		sound.play();
	}

	function octaveUp(pressedKey, audioFiles) {
		var note = $('[data-sound="'+ pressedKey +'"]')[0];
		console.log(note);
		var root = audioFiles.index($(note));

		audioFiles[root + 12].currentTime = 0;
		audioFiles[root + 12].play();
	}

	function octaveDown(pressedKey, audioFiles) {
		var note = $('[data-sound="'+ pressedKey +'"]')[0];
		console.log(note);
		var root = audioFiles.index($(note));

		audioFiles[root - 12].currentTime = 0;
		audioFiles[root - 12].play();
	}

	function arpeggiate(pressedKey, audioFiles) {
		
		// get index of pressed key in audioFiles array
		
		var note = $('[data-sound="'+ pressedKey +'"]')[0];
		console.log(note);
		var root = audioFiles.index($(note));
		// play note
		audioFiles[root].currentTime = 0;
		audioFiles[root].play();

		// play 3rd
		setTimeout(function() {
			audioFiles[root + 4].currentTime = 0;
			audioFiles[root + 4].play();
		},500);

		// play 5th
		setTimeout(function() {
			audioFiles[root + 7].currentTime = 0;
			audioFiles[root + 7].play();
		},1000);

		// come down
		// play 3rd
		setTimeout(function() {
			audioFiles[root + 4].currentTime = 0;
			audioFiles[root + 4].play();
		},1500);

		// play root
		setTimeout(function() {
			audioFiles[root].currentTime = 0;
			audioFiles[root].play();
		},2000);
	} // end arpeggiate function




}); // end document ready