export function lazyload(images) {
  let imgs = [].slice.call(images || document.querySelectorAll('.lazyload'))  // Array.from(images)

  if ('IntersectionObserver' in window) {
    let observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          loadImage(entry.target, () => {
            observer.unobserve(entry.target)
          })
        }
      })
    }, { threshold: 0.01 })
  
    imgs.forEach(img => observer.observe(img))
  } else {
    let onscroll = throttle(function() {
      if (imgs.length === 0) {
        return window.removeEventListener('scroll', onscroll)
      }
      imgs = imgs.filter(img => img.classList.contains('lazyload'))
      imgs.forEach(img => inViewport(img) && loadImage(img))
    }, 300)
  
    window.addEventListener('scroll', onscroll)
    window.dispatchEvent(new Event('scroll'))
  }
}

function inViewport(img){
	let {top, bottom, left, right} = img.getBoundingClientRect()
	let vpWidth = document.documentElement.clientWidth
	let vpHeight = document.documentElement.clientHeight
	return (
		(top > 0 && top < vpHeight || bottom > 0 && bottom < vpHeight) &&
		(left > 0 && left < vpWidth || right > 0 && right < vpWidth)
	)
}

function loadImage(img, callback){
	let image = new Image() //Image()函数将会创建一个新的HTMLImageElement实例
	image.src = img.dataset.src
	image.onload = function(){
		img.src = image.src
		img.classList.remove("lazyload")
		if (typeof callback === "function") callback()
	}
}

function throttle(func, wait){
	let prev,timer
	return function fn(){
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