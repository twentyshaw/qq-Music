import { RECOMMEND_URL } from './constants.js'

export class Slider{
	constructor(el,interval){
		this.$el = el
		this.slides = {}
		this.interval = interval || 3000
		this.index = 0 
		this.start()
		this.launch()
	}

	launch(){
		fetch(RECOMMEND_URL)
		.then(res=> res.json() /*因为得到的响应还不是一个json对象，需要用 json() 来把它转化为json对象*/
		).then(json => json.data.slider)
		 .then(json => this.render(json))
		return this
	}

	render(sliders){
		this.slides = sliders.map(slide => {
			 	return {
			 		link: slide.linkUrl.replace('http://', 'https://'),
			 		image:slide.picUrl.replace('http://', 'https://')
			 	}
			 })
		this.$el.innerHTML = `<div class="qq-slider-wrap"></div>`
		this.$wrap = this.$el.firstChild
		this.$wrap.style.width = `${this.slides.length * 100}%`
		this.$wrap.innerHTML = this.slides.map(slide => 
			`<div class="qq-slider-item">
			<a href="${slide.link}">
				<img src="${slide.image}">
			</a>
			</div>`
		).join("")
	}

	start(){
		setInterval(this.next.bind(this),this.interval)
	}

	next(){
		this.index += 1
		if (this.index == this.slides.length ) {
			this.$wrap.style.transform = `translate(0)`
			this.index = 0
			return
		}
		let x = `-${this.index * 100/ this.slides.length}%`
		this.$wrap.style.transform = `translate(${x})`
	}
}