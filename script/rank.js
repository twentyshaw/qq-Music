import { lazyload } from "./lazyloader.js"

export class Toplist{
	constructor(el){
		this.$el = el
		this.launch()
	}

	launch(){
		fetch("../json/rank.json")
		 .then(res=> res.json()
		 	.then(json => json.req_0.data.group)
		 	).then(json => this.render(json))
		 console.log(this)
		return this		
	}

	render(tops){
		this.$el.innerHTML = tops.map(top=>
			`<ul id="group${top.groupId}">
				${this.toplist(top.toplist)}
			</ul>`
		).join("")
	    lazyload(this.$el.querySelectorAll("#rank-view .toplist .lazyload"))
	}

	toplist(items){
		return items.map(item =>
			`<li class="toplist">
				<div class="top-image"><img class="lazyload" data-src="${item.frontPicUrl}"></div>
				<div class="top-content">
					<h3 class="top-title">${item.title}</h3>
					<ul class="songlist">
						${this.songlist(item.song)}
					</ul>
				</div>
			</li>`
		).join("")
	}

	songlist(songs){
		return songs.map((song,i)=>
		   `<li><span class="song-index">${i + 1}</span><span class="song">${song.title}</span><span class="singer">${song.singerName}</span></li>`
		).join("")
	}

}
