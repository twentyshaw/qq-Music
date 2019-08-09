export class Radio{
	constructor(el){
		this.$el = el
		this.launch()
	}

	launch(){
		fetch("../json/rec.json")
		.then(res=> res.json() /*因为得到的响应还不是一个json对象，需要用 json() 来把它转化为json对象*/
		).then(json => json.data.radioList)
		 .then(json => this.render(json))
		return this
	}

	render(radios){
	 	this.$el.innerHTML = radios.map(radio =>
	 		`
				<li class="radio-item"><a href="#">
					<img src="${radio.picUrl}">
					<span class="icon icon_play"></span>
					<p>${radio.Ftitle}</p>
				</a></li>
	 		`
	 	).join("")
	 }
}