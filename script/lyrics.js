export class Lyrics{
	constructor(el){
		this.$el = el
		this.$el.innerHTML = "<div class='lyric-line'></div>"
		this.$line = this.$el.querySelector(".lyric-line")
		this.text = ""
		this.index = 0
		this.elapsed = 0
		this.lyrics = []
		this.reset(this.text)
	}
	start(){
		this.intervalId = setInterval(this.update.bind(this), 1000)
	}

	pause(){
		clearInterval(this.intervalId)
	}

	update(){
		this.elapsed += 1
		if (this.index === this.lyrics.length - 1 ) return this.reset()
		for (let i = this.index + 1; i < this.lyrics.length; i++) {
			let seconds = this.getSeconds(this.lyrics[i])
			if (this.elapsed === seconds && (!this.lyrics[i+1] || this.elapsed < this.getSeconds(this.lyrics[i + 1]))) {
				this.$line.children[this.index].classList.remove("active")
				this.$line.children[i].classList.add("active")
				this.index = i
				break
			}
		}

		if (this.index > 2) {
			let y = -(this.index - 2) * this.LINE_HEIGHT
			this.$line.style.transform = `translateY(${y}px)`
		}
	}

	reset(text){
		this.pause()
		this.index = 0
		this.elapsed = 0
		if (text) {
			this.text = this.formatText(text) || ""
			this.lyrics =this.text.match(/^\[\d{2}:\d{2}.\d{2}\](.+)$/gm) || []
			if (this.lyrics.length) {
				this.render()
				this.$line.children[this.index].classList.add("active")
			}
		}
	}

	restart(){
		this.reset()
		this.start()
	}

	getSeconds(line){
		return +line.replace(/^\[(\d{2}):(\d{2}).*/, (match,p1,p2) => 60*(+p1)+(+p2))
	}

	render(){
		let html = this.lyrics.map(line => `
			<div class="lyrics-lines">${line.slice(10)}</div>		
		`).join("")
		this.$line.innerHTML = html
	}

	formatText(text){
		let div = document.createElement("div")
		div.innerHTML = text
		return div.innerText
	}
}

Lyrics.prototype.LINE_HEIGHT = 42