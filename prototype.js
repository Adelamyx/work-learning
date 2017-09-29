function animal() {
	this.aaa = 'mm'
}

function person() {
	this.species = "人";
	this.sex = "man";
	this.speck = function () {
		console.log("我会说话");
	}
}

person.prototype = new animal();

function maomao(name, color) {
	this.name = name;
	this.color = color;
}

maomao.prototype = new person();

var mm = new maomao('xiaom', 'pink');
