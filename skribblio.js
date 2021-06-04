var canvas 		= document.getElementById('canvasGame') 
var overlay 	= document.getElementById('overlay')
var screenGame 	= document.getElementById('screenGame');
var boxMessages = document.getElementById("boxMessages")

var drawing64 			= null
var drawingCompleted 	= false
var drawingStore		= {}

var captureCanvasInterval = setInterval(captureCanvas, 1000);

function downloadImage(e){
	let drawingKey = e.target.id
	var link = document.createElement('a');
	link.download = `${drawingKey}.png`;
	link.href = drawingStore[drawingKey]
	link.click();
	link.delete;
}

function displayMessage(textContent, id = null){
	var pTag = document.createElement('p')
	pTag.style = 'color: rgb(83, 57, 206); font-weight: bold;'

	var spanTag = document.createElement('span')
	if(id !== null){
		spanTag.style = "cursor: pointer"
		spanTag.className = "download-text"
		spanTag.id = id
	}

	var text = document.createTextNode(textContent);
	spanTag.appendChild(text)

	pTag.appendChild(spanTag)
	boxMessages.appendChild(pTag)
}

function captureCanvas() {
	if(overlay.style.display == 'none'){
		drawing64 = canvas.toDataURL()
		drawingCompleted = false
	}else if (overlay.style.display == '' && !drawingCompleted){
		// console.log(drawing64)
		let drawingNumber = Math.floor(Math.random() * 100000)
		drawingStore[drawingNumber] = drawing64
		// boxMessages.insertAdjacentHTML("beforeend",
		//         	`<p style="color: rgb(83, 57, 206); font-weight: bold;"><span id='${drawingNumber}' class='download-text' style="cursor: pointer">Click to download image</span></p>`);
		displayMessage("Click to download image",drawingNumber)
					boxMessages.scroll({ top: boxMessages.scrollHeight});
		let thisDrawing = document.getElementById(drawingNumber)
		thisDrawing.addEventListener("click", (e) => downloadImage(e),false);
		drawingCompleted = true;
	}
}

var callback = function(mutationsList, observer) {
	for(const mutation of mutationsList) {
	if(screenGame.style.display == ''){
					captureCanvasInterval = setInterval(captureCanvas, 1000);
					// boxMessages.insertAdjacentHTML("beforeend",
					// `<p style="color: rgb(83, 57, 206); font-weight: bold;"><span>You can now download images after each turn!</span></p>`);
					displayMessage("You can now download images after each turn!")
			}else{
					console.log('Not in game')
					clearInterval(captureCanvasInterval)
		}
	}
};

var screenGameobserver = new MutationObserver(callback);

screenGameobserver.observe(screenGame, {attributes: true});