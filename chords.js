var notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

var strings = [{note: 4, octave: 0}, {note: 9, octave: 0}, {note: 2, octave: 1}, {note: 7, octave: 1}, {note: 11, octave: 1}, {note: 4, octave: 2}];

var chords = [
	{name: 'Major', sequence: [4, 7]},
	{name: 'Minor', sequence: [3, 7]},
	{name: '5th', sequence: [7]},
	{name: 'Augmented', sequence: [4, 8]},
	{name: 'Diminished', sequence: [3, 6]},
	{name: 'Suspended 2nd', sequence: [2, 7]},
	{name: 'Suspended 4th', sequence: [5, 7]},
	{name: 'Major 6th', sequence: [4, 7, 9]},
	{name: 'Minor 6th', sequence: [3, 7, 9]},
	{name: 'Dominant 7th', sequence: [4, 7, 10]},
	{name: 'Dominant 7th flat 5', sequence: [4, 6, 10]},
	{name: 'Major 7th', sequence: [4, 7, 11]},
	{name: 'Augmented Major 7th', sequence: [4, 8, 11]},
	{name: 'Diminished Major 7th', sequence: [3, 6, 11]},
	{name: 'Minor Major 7th', sequence: [3, 7, 11]},
	{name: 'Minor 7th', sequence: [3, 7, 10]},
	{name: 'Augmented 7th', sequence: [4, 8, 10]},
	{name: 'Half Diminished 7th', sequence: [3, 6, 10]},
	{name: 'Fully Diminished 7th', sequence: [3, 6, 9]},
	{name: 'Suspended 4th 7th', sequence: [5, 7, 10]}
];

var fretSpacing = 30;
var numberOfFrets = 14;

function init() {
	
	/*
	Guitar tuning dropdowns.
	*/
	
	var td = document.createElement('td');
	document.getElementById('tuning').appendChild(td);
	
	for(var string = 0; string < strings.length; string++) {
		td = document.createElement('td');
		document.getElementById('tuning').appendChild(td);
		td.id = 'td' + string;
		
		var select =  document.createElement('select');
		document.getElementById('td' + string).appendChild(select);
		select.id = 'string' + string;
		
		document.getElementById('td' + string).appendChild(select);
		
		for(note = 0; note < notes.length; note++) {
			var option = document.createElement('option');
			option.text = notes[note];
			option.value = note;
			document.getElementById('string' + string).appendChild(option);
		}
		
		document.getElementById('string' + string).value = strings[string].note;
		document.getElementById('string' + string).onchange = displayChord;
	}
	
	td = document.createElement('td');
	document.getElementById('tuning').appendChild(td);
	
	
	
	
	/*
	Chord selection dropdowns.
	*/
	
	for(var note = 0; note < notes.length; note++) {
		var option = document.createElement('option');
		option.text = notes[note];
		option.value = note;
		document.getElementById('notes').appendChild(option);
	}
	
	for(var chord = 0; chord < chords.length; chord++) {
		var option = document.createElement('option');
		option.text = chords[chord].name;
		option.value = chord;
		document.getElementById('chords').appendChild(option);
	}
	
	document.getElementById('notes').onchange = displayChord;
	document.getElementById('chords').onchange = displayChord;
	
	
	
	
	/*
	Guitar frets and notes.
	*/
	
	var guitar = document.getElementById('frets');
	
	for(var fret = 0; fret <= numberOfFrets; fret++)
	{		
		var tr = document.createElement('tr');
		guitar.appendChild(tr);
		tr.id = 'fret' + fret;
		
		td = document.createElement('td');
		td.className = 'frets';
		td.innerHTML = fret;
	    document.getElementById(tr.id).appendChild(td);
		
		for(var string = 0; string < strings.length; string++)
		{
			var td = document.createElement('td');
			document.getElementById('fret' + fret).appendChild(td);
			td.id = tr.id + 'string' + string;
			td.className = 'notes';
		}
		
		td = document.createElement('td');
		td.className = 'frets';
		td.innerHTML = fret;
	    document.getElementById(tr.id).appendChild(td);
	}
	
	
	
	
	
	displayChord();
}

function displayChord() {
	displayChordNotes(document.getElementById('notes').value, chords[document.getElementById('chords').value].sequence);
}

var currentNote;
var displayNote;

function displayChordNotes(note, sequence) {
	for(var string = 0; string < strings.length; string++)
	{
		strings[string].note = parseInt(document.getElementById('string' + string).value);
		
		for(var fret = 0; fret <= numberOfFrets; fret++)
		{
			displayNote = false;
			
			currentNote = (strings[string].note + fret) % notes.length;
			if(currentNote == note) 
			{
				displayNote = true;
			}
			
			for(interval = 0; interval < sequence.length; interval++) 
			{
				if(currentNote == (parseInt(note) + parseInt(sequence[interval])) % notes.length) 
				{
					displayNote = true;
				}
			}
			
			if(displayNote == true) 
			{
				document.getElementById('fret' + fret + 'string' + string).innerHTML = notes[(strings[string].note + fret) % notes.length];
			} 
			else 
			{
				document.getElementById('fret' + fret + 'string' + string).innerHTML = '';
			}
		}
	}	
}