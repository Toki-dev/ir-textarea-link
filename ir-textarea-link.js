(function() {
	Polymer({
		is: 'ir-link',

		properties: {

			promptMode : {
				type : Boolean,
				value : false,
				notify : true
			}
		},

		doLink : function (target, follow, href, text, img) {

			if (!linknode) var linknode = document.createElement('a');
			linknode.setAttribute("href", href);
			if(follow) linknode.setAttribute("rel", "nofollow");
			linknode.setAttribute("target", target);
			if(img){
				linknode.innerHTML = img;
			}
			else{linknode.appendChild(document.createTextNode(text));}

			return linknode;
		},

		createLink: function(e){
			var target = this.$.target1.value;
			var follow = this.$.follow.checked;
			var href = this.$.Href.value;
			var text = this.$.TextValue.value;
			var img1 = this.$.ifImage.value;
			var link = this.doLink(target,follow, href, text, img1);

			link = link.outerHTML
			console.log('link created');
			this._updateValue(link);
		},

		_updateValue : function(x) {
			var that = this;
			that.value = x;

		},

		hideDialog : function (e) {
			this.$.dialog.close();
		},

		open : function(ev) {
			var that = this;
			var range = window.getSelection().getRangeAt(0);
			var child = range.startContainer.firstChild;
			if(child){
				if(child.tagName == 'IMG')
				var innerImage = child.outerHTML;
			}

			var parent = range.startContainer.parentNode;
			var href = parent.href || 'http://example.com';
			var selectedText = range.toString() || 'Change me';
			this.set("_linkState", {});
			this.set("_linkState.text", selectedText);
			this.set("_linkState.url", href);
			this.set("_linkState.img", innerImage);

			setTimeout(function() {
				that.$.dialog.open();
			}, 100);
		},

		prompt : function(callback) {
			if(!this.promptMode)
				throw new Error("must be in prompt mode to use .prompt");

			this.promptCallback = callback;
			this.open()
		},


		promptSelect : function() {
			console.log('prompt selected!')
			this.hideDialog();
			this.promptCallback(this.value);
		},

	});


})();
