function Model(value) {
	this._value = typeof value === 'undefined' ? '' : value;
	this._listeners = [];
};

Model.prototype.set = function(value) {
	var self = this;
	self._value = value;
	setTimeout(function() {
		self._listeners.forEach(function(listener) {
			listener.call(self, value);
		});
	});
};

Model.prototype.watch = function(listener) {
	this._listeners.push(listener);
};

Model.prototype.bind = function(node) {
	this.watch(function(value) {
		node.innerHTML = value;
	});
};

function Controller(callback){
	var models = {};
	var views = document.querySelectorAll('[bind]');
	views = Array.prototype.slice.call(views, 0);
	views.forEach(function(node) {
		var modelName = node.getAttribute('bind');
		models[modelName] = models[modelName] || new Model();
		models[modelName].bind(node);
	});
	callback.call(this, models);
}
//html
//<div id="div1" bind="model1"></div>
//<div id="div2" bind="model1"></div>

//logic
new Controller(function(models) {
	var model1 = models.model1;
	model1.set('weichao');
});