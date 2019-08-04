(function(){
	fetch("../json/rec.json")
	 .then(res=> res.json() /*因为得到的响应还不是一个json对象，需要用 json() 来把它转化为json对象*/
	 ).then(render)

	 function render(json){
	 	renderSlider(json.data.slider)
	 	renderRadio(json.data.radioList)
	 }

	 let search = new Search(document.querySelector("#search-view"))

	 function renderSlider(slides){
		 let sliders = slides.map(slide => {
		 	return {link: slide.linkUrl, image:slide.picUrl}
		 })
		 let slider = new Slider({
		    el: document.querySelector("#slider"),
			slides: sliders
		 })
	 }

	 function renderRadio(radios){
	 	document.querySelector(".radio-list").innerHTML = radios.map(radio =>
	 		`
				<li class="radio-item"><a href="#">
					<img src="${radio.picUrl}">
					<span class="icon icon_play"></span>
					<p>${radio.Ftitle}</p>
				</a></li>
	 		`
	 	).join("")
	 }

})()