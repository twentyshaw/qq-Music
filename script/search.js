export class Search {
	constructor(el){
		this.$el = el
		this.$input = this.$el.querySelector("#search")
		this.$songs = this.$el.querySelector(".song-list")
		this.$input.addEventListener("keyup", this.onKeyUp.bind(this))
		this.keyword = ""
		this.page = 1
		this.perpage = 20
		this.song = []
		this.nomore = false
		this.fetching = false //用来防止每滚一下都发一次请求
		this.onscroll = this.onScroll.bind(this)
		window.addEventListener("scroll", this.onscroll)
	}

	onKeyUp(event){
		let keyword = event.target.value.trim() //trim 去掉前后空格
		if (!keyword) return this.reset()
		if (event.key !== "Enter") return
		this.search(keyword)
	}

	onScroll(event){
		if (this.nomore) return
		if (document.documentElement.clientHeight + pageYOffset > document.body.scrollHeight -50) {
			this.search(this.keyword, this.page + 1)
		}
	}

	reset(){
		this.page = 1
		this.keyword = ""
		this.song = []
		this.$songs.innerHTML = ""
	}

	search(keyword,page){
		if (this.fetching) return //用来防止每滚一下都发一次请求
		this.fetching = true //用来防止每滚一下都发一次请求
		this.keyword = keyword
		fetch(`http://localhost:4000/search?keyword=${this.keyword}&page=${page || this.page}`)
		 .then(res => res.json())
		  .then(json => {
		  	this.page = json.data.song.curpage
		  	this.nomore = (json.message === "no results")
		  	/*this.songs.push(...json.data.song.list) *///把请求到的json.data.song.list缓存起来
		  	console.log(json.data.song.list)
		  	return json.data.song.list
		  })
		   .then(songs => this.append(songs))
		   .then(() => this.fetching = false)//用来防止每滚一下都发一次请求
		   .catch(() => this.fetching = false)//用来防止每滚一下都发一次请求
	}

	append(songs){
		let html = songs.map(song => 
			`<li class="song-item">
			 <a href="#player?artist=${song.singer[0].name}&songid=${song.songid}&songmid=${song.songmid}&songname=${song.songname}&albummid=${song.albummid}&duration=${song.interval}">
				<i class="icon icon-music"></i>
				<div class="song-name ellipsis">${song.songname}</div>
				<div class="song-artist ellipsis">${song.singer.map(s=>s.name).join("")}</div>
			</a>
			</li>`
			).join("")
		this.$songs.insertAdjacentHTML("beforeend", html) //insertAdjacentHTML 不会像innerHTML一样破坏掉已存在的元素
	}
}