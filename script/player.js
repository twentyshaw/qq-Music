import { ProgressBar } from "./progress-bar.js"
import { Lyrics } from "./lyrics.js"
import { songUrl, lyricsUrl, albumCoverUrl } from './helpers.js'

export class MusicPlayer{
	constructor(el){
		this.$el = el
		this.$el.addEventListener("click", this) //为啥这个this指向handleEvent
		this.creatAudio()
		this.progress = new ProgressBar(this.$el.querySelector(".progress"),false)
		this.lyrics = new Lyrics(this.$el.querySelector(".lyric"))
	}

	creatAudio(){
		this.$audio = document.createElement("audio")
		this.$audio.loop = true
		document.body.appendChild(this.$audio)
	}

	handleEvent(event){ //我点击#player里面的任何一个元素 都会被捕获到
		let target = event.target
		console.log(target)
		switch(true){
			case target.matches(".icon-play"):		 
			 this.onPlay(event)
			 break
			case target.matches(".icon-pause"):
			 this.onPause(event)
			 break
			case target.matches(".album-img"):
			  this.switchLyric(event)
			  break
			case target.matches(".lyrics-lines"):
			  this.switchAlbum(event)
			  break
		}
	}

	onPlay(event){
		this.$audio.play()
		this.progress.start()
		event.target.classList.remove("icon-play")
		event.target.classList.add("icon-pause")
	}

	onPause(event){
		this.$audio.pause()
		this.progress.pause()
		event.target.classList.remove("icon-pause")
	    event.target.classList.add("icon-play")
	}

	switchLyric(event){
		if (event.target.parentNode.classList.contains("show")) {
			event.target.parentNode.classList.remove("show")
			event.target.parentNode.classList.add("hide")
			event.target.parentNode.nextElementSibling.classList.remove("hide")
			event.target.parentNode.nextElementSibling.classList.add("show")
	    }
	}

	switchAlbum(event){
		if (event.target.parentNode.parentNode.classList.contains("show")) {
		    event.target.parentNode.parentNode.classList.remove("show")
			event.target.parentNode.parentNode.classList.add("hide")
			event.target.parentNode.parentNode.previousElementSibling.classList.remove("hide")
			event.target.parentNode.parentNode.previousElementSibling.classList.add("show")
		}
	}

	play(options={}){
		if (!options) return
		this.$el.querySelector(".song-name").innerText = options.songname
		this.$el.querySelector(".singer-name").innerText = options.artist
		this.progress.reset(options.duration)
                                                                    
		let url = albumCoverUrl(options.albummid)
		this.$el.querySelector(".album-img").src = url
		this.$el.querySelector(".bg img").src = url

		if (options.songid) {
			console.log(options.songid)
			this.songid = options.songid
			this.$audio.src =songUrl(this.songid)
			console.log(lyricsUrl(this.songid))
			fetch(lyricsUrl(this.songid))
				.then(res=>res.json())
				 .then(json=>json.lyric)
				  .then(text=>this.lyrics.reset(text))
				   .catch(()=>{})
		}
		this.show()
	}

	show(){
		if (this.$el.classList.contains("hide")) {
			this.$el.classList.remove("hide")
			this.$el.classList.add("show")
	    }
    }

	hide(){
		if (this.$el.classList.contains("show")) {
			this.$el.classList.remove("show")
			this.$el.classList.add("hide")
	    }
	}

}