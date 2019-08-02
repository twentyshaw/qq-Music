var targets = document.querySelectorAll(".nav-item") 
targets.forEach(target=>{
	target.addEventListener("click",function(){
		console.log(this)
		let navs = this.parentElement.children
		let content = document.querySelector(`#${this.dataset.view}`)
		console.log(content)
		Array.prototype.forEach.call(navs,nav=>{
			nav.classList.remove("active")	
		})
		this.classList.add("active")
		Array.prototype.forEach.call(content.parentElement.children,child=>{
			child.classList.add("hide")
		})
		content.classList.remove("hide")
	})
})
