import { ProgressBar } from "./progress-bar.js"
import { Lyrics } from "./lyrics.js"

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
                                                                    
		let url = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${options.albummid}.jpg?max_age=2592000`
		this.$el.querySelector(".album-img").src = url
		this.$el.querySelector(".bg img").src = url

		if (options.songid) {
			console.log(options.songid)
			this.$audio.src =`http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400002TRY4a3zfxC8.m4a?guid=5561900148&vkey=7D51FAD7826BC57DA7A012F8D5F54F7E6F965EDD2DB6145A5ED872924D492058813AE9692036C9CE330CA6F29B36B56117DA99CCE6D82F30&uin=0&fromtag=38`
			fetch(`https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&nobase64=1&musicid=${options.songid}&songtype=0&_=1565247849296&jsonpCallback=jsonp1`)
				.then(res=>res.json)
				 .then(json=>json.lyric)
				  .then(text=>this.Lyrics.reset(text))
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