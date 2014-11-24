var React = require('react');
var BemReact = require('..');

var Button = React.createClass({
	render: function() {
		return BemReact.create({
			block : 'button',
			tag : 'button',
			mods : {
				size : this.props.size,
				disabled : this.props.disabled
			},
			children : this.props.text
		});
	}
});

var BEMComponent = BemReact.renderBemjsonToMarkup({block: Button, size : 'xl', disabled : true, text : 'click me' });
var str = React.renderToStaticMarkup(BEMComponent);
console.log('str:', str);
