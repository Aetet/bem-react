var React = require('react');
var BEM = React.createClass({
	render: function () {
		var json = this.props;
		var curBlock = json.block;
		if(json) {
			if(Array.isArray(json)) {
				return json.map(function(item) {
					return bemJsonToReact(item, curBlock);
				});
			}
			if(json.elem) {
				if(!json.tag) {
					throw Error('Specify tag');
				}
				json.className = buildBemClassName((json.block || curBlock) + ELEM_DELIM + json.elem, json.mods, json.mix);
				return React.createElement(json.tag, json, bemJsonToReact(json.children));
			}
			if(json.block) {
				return React.createElement(json.block, json);
			}
		}
		return json;
	}
});

function bemJSONToReact (json, curBlock) {
	if(json) {
		if(Array.isArray(json)) {
			return json.map(function(item) {
				return bemJsonToReact(item, curBlock);
			});
		}
		if(json.elem) {
			if(!json.tag) {
				throw Error('Specify tag');
			}
			json.className = buildBemClassName((json.block || curBlock) + ELEM_DELIM + json.elem, json.mods, json.mix);
			return React.createElement(json.tag, json, bemJsonToReact(json.children));
		}
		if(json.block) {
			return React.createElement(json.block, json);
		}
	}
	return json;
}

function buildBemClassName(bemEntity, mods, mix) {
	var res = bemEntity;
	for(var modName in mods) {
		mods[modName] &&
		(res += ' ' + bemEntity + MOD_DELIM + modName +
			(mods[modName] === true? '' : MOD_DELIM + mods[modName]));
	}
	if(mix) {
		var i = 0,
		mixItem;
		while(mixItem = mix[i++]) {
			if(!mixItem.block || !mixItem.elem) {
				throw Error('Specify both block and elem in mix');
			}
			res += ' ' + buildBemClassName(mixItem.block + ELEM_DELIM + mixItem.elem, mixItem.mods);
		}
	}
	return res;
}
module.exports = {
	renderBemjsonToMarkup: function (json, domElem) {
		return React.createElement(json.block, json);
	},
	create: function (bemJson) {
		return React.createElement(BEM, bemJson);
	}
};
