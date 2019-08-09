import "./tab.js"
import "./tab.js"
import { Slider } from "./slider.js"
import { Radio } from "./radio.js"
import { Toplist } from "./rank.js"
import { Search } from "./search.js"
import { MusicPlayer } from "./player.js"


 let slider = new Slider(document.querySelector("#slider"))
 let radio = new Radio(document.querySelector(".radio-list"))
 let toplist = new Toplist(document.querySelector("#rank-view"))
 let search = new Search(document.querySelector("#search-view"))
 let musicplayer = new MusicPlayer(document.querySelector("#player"))


 let playerBtn = document.querySelector("#player-btn")
 playerBtn.addEventListener("click",showPlayer)

 function showPlayer(){
 	let music = document.querySelector("#player")
 	if (music.classList.contains("show")) {
 		music.classList.remove("show")
 		music.classList.add("hide")
 	}else{
 		music.classList.remove("hide")
 		music.classList.add("show")
 	}
 }


 function onHashChange(){
 	let hash = location.hash
 	if (/^#player\?.+/.test(hash)) {
 		let matchs = hash.slice(hash.indexOf("?")+1).match(/(\w+)=([^&]+)/g)
 		let options = matchs && matchs.reduce((res,cur) => {
 			let arr = cur.split("=")
 			res[arr[0]] = decodeURI(arr[1]) //记得转码
 			return res
 		}, {}) // 为啥有个空的
 		console.log(options)
 		musicplayer.play(options)
 		musicplayer.show()
 	}else{
 		musicplayer.hide()
 	}
 }

 onHashChange()
 window.addEventListener("hashchange", onHashChange)
