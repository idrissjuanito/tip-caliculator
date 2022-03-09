const tipOptions = document.querySelectorAll("ul li")
const tipAmount = document.querySelector(".tip-amount")
const totalBill = document.querySelector(".total-bill")
const billInput = document.querySelector("#bill")
const btnReset = document.querySelector(".btn-reset")
const peopleBlock = document.querySelector(".people")
const peopleinput = document.querySelector("#people")
const customTip = document.querySelector(".custom")
let people = peopleinput.value
let billValue = billInput.value
let tip = "0%";

billInput.addEventListener("input", (e) => {
	billValue = e.target.value
	calcTip()
})

tipOptions.forEach( (opt) => {
		opt.addEventListener("click", function() {
		if(this.textContent === "Custom"){
			this.innerHTML = `<input type="number" name="custom-tip" id="custom-tip" placeholder="0" max="100">`
			const customTipInput = document.querySelector("#custom-tip")
			customTipInput.addEventListener("input", (e) => {
				tip = e.target.value+"%"
				calcTip()
			})
			customTipInput.addEventListener("change", (e) =>{
				if(e.target.value === "0" || e.target.value === ""){
					this.textContent = "Custom"
				}
			})
		}else{
			tipOptions.forEach((option) =>{
				option.style.backgroundColor = ""
			})
			if(!this.classList.contains("custom")){
				this.style.backgroundColor = "hsl(172, 67%, 45%)"
			}

			tip = this.textContent
			calcTip()
		}
	})
})

peopleinput.addEventListener("change", function(){
	if(this.value === "0" || this.value === ""){
		if(peopleBlock.childElementCount < 2){
			peopleBlock.innerHTML += "<span>Can\'t be Zero</span>"
		}
		peopleBlock.nextElementSibling.style.outline = "2px solid red"
	}else{
		if(peopleBlock.childElementCount > 1){
			peopleBlock.lastElementChild.remove()
			peopleBlock.nextElementSibling.style.outline = ""
		}
	}
})

peopleinput.addEventListener("input", function(){
	people = this.value
	calcTip()
})

function calcTip(){
	people = Number(people)
	let tipPer = Number(tip.slice(0, -1))/100
	billValue = Number(billValue)

	if(people !== 0){
		let tipPerPerson = (billValue * tipPer)/people
		let totalPerPerson = billValue/people + tipPerPerson
		tipAmount.textContent = "$"+tipPerPerson.toFixed(2)
		totalBill.textContent = "$"+totalPerPerson.toFixed(2)
	}else{
		return 0
	}
}


btnReset.addEventListener("click", () => {
	billInput.value = "0"
	billValue = billInput.value
	peopleinput.value = "0"
	customTip.textContent = "Custom"
	tipAmount.textContent = "$0.00"
	totalBill.textContent = "$0.00"
	people = 0;
	tipOptions.forEach((option) =>{
		option.style.backgroundColor = ""
	})
	calcTip()
})




