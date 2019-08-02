(function(){
	fetch("../json/rank.json")
	 .then(res=> res.json()
	 	).then(render)

	function render(json){
		renderToplist(json.req_0.data.group)
	}

	function renderToplist(tops){
		document.querySelector("#rank-view").innerHTML = tops.map(top=>
			`<ul id="group${top.groupId}">
				${toplist(top.toplist)}
			</ul>`
		).join("")

		function toplist(items){
			return items.map(item =>
				`<li class="toplist">
					<div class="top-image"><img src="${item.frontPicUrl}"></div>
					<div class="top-content">
						<h3 class="top-title">${item.title}</h3>
						<ul class="songlist">
							${songlist(item.song)}
						</ul>
					</div>
				</li>`
			).join("")

			function songlist(songs){
				return songs.map((song,i)=>
				   `<li><span class="song-index">${i + 1}</span><span class="song">${song.title}</span><span class="singer">${song.singerName}</span></li>`
				).join("")
			}
		}
	}
})()