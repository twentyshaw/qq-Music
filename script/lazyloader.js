function lazyload(images){
	let imgs = Array.prototype.slice.call(images)


	let onscroll = throttle(function(){
		console.log(new Date())
		if (imgs.length === 0) {
			return window.removeEventListener("scroll", onscroll)
		}
		imgs = imgs.filter(img => img.classList.contains("lazyload"))
		imgs.forEach(img => {
			if (inViewport(img)) {
				loadImage(img)
			}
		})
	},400)

window.addEventListener("scroll",onscroll)
window.dispatchEvent(new Event("scroll")) //我为什么触发不了

	function inViewport(img){
		let {top, bottom, left, right} = img.getBoundingClientRect()
		let vpWidth = document.documentElement.clientWidth
		let vpHeight = document.documentElement.clientHeight
		return (
			(top > 0 && top < vpHeight || bottom > 0 && bottom < vpHeight) &&
			(left > 0 && left < vpWidth || right > 0 && right < vpWidth)
		)
	}

	function loadImage(img){
		console.log(img)
		let image = new Image() //Image()函数将会创建一个新的HTMLImageElement实例
		image.src = img.dataset.src
		image.onload = function(){
			img.src = image.src
			img.classList.remove("lazyload")
		}
	}

	function throttle(func, wait){
		let prev,timer
		return function(){
			let curr = Date.now()
			let differ = curr - prev
			if (!prev || differ >= wait) {
				func()
				prev = curr
			}else if(differ < wait){
				clearTimeout(timer)
				timer = setTimeout(func, wait -differ)
			}
		}
	}
}