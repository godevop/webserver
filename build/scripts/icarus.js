define(["lib/react","lib/clib"],function(e,t){function r(){this.last=0,this.arr=[],this.length=25;for(var e=0;e<this.length;++e)this.append()}var n=e.DOM;r.prototype.append=function(){var e=Math.random()<=.501;e?this.last++:this.last=0,this.arr.push(this.last),this.arr.length>this.length&&this.arr.shift()};var i=e.createClass({render:function(){return n.canvas({width:this.width,height:this.height})},componentDidMount:function(){this.draw();var e=this;setInterval(function(){e.data.append(),e.draw()},1e3)},width:400,height:300,data:new r,draw:function(){var e=this.getDOMNode().getContext("2d");this.drawBorder()},drawBorder:function(){var e=this.getDOMNode().getContext("2d");e.fillStyle="black",e.strokeStyle="black",e.fillStyle="#282828",e.fillRect(0,0,this.width,this.height),e.lineWidth=.5,e.fillStyle="white",e.strokeStyle="grey",e.textAlign="center",e.textBaseline="middle";var t=this.width/this.data.length;for(var n=1;n<=this.data.length;++n){e.beginPath();var r=n*t;e.moveTo(r,0),e.lineTo(r,this.height),e.stroke()}var i=20,s=this.height/i;for(var n=1;n<=i;++n){var o=this.height-s*n;e.fillText(n.toString(),this.width-t/2,o+s/2),e.beginPath(),e.moveTo(0,o),e.lineTo(this.width,o),e.stroke()}var r=0,o=this.height;e.lineWidth=5,e.fillStyle="#6699FF";for(var n=0;n<this.data.length;++n){e.beginPath(),e.moveTo(r,this.height),e.lineTo(r,o),r+=t;var u=this.data.arr[n],o=this.height-u*s;e.quadraticCurveTo(r-t,o,r,o),e.lineTo(r,this.height),e.fill()}}}),s=e.createClass({displayName:"Controls",propTypes:{engine:e.PropTypes.object.isRequired,tentativeFlightLevel:e.PropTypes.number.isRequired,setTentativeFlightLevel:e.PropTypes.func.isRequired},getInitialState:function(){return{rewardText:1}},setRewardText:function(e){this.setState({rewardText:e.target.value})},invalidInputError:function(){var e=parseFloat(this.state.rewardText);if(Number.isNaN(e))return"Invalid reward amount";if(e<=0)return"Reward must be positive";var t=parseInt(this.props.tentativeFlightLevel);return Number.isNaN(t)?"Invalid flight height":null},waveCrashLoss:function(){var e=Math.round(parseFloat(this.state.rewardText)*100);console.assert(Number.isFinite(e));var t=parseInt(this.props.tentativeFlightLevel);return console.assert(Number.isFinite(t)),e*(Math.pow(2,t)-1)},render:function(){var e=this.invalidInputError();return e||(e=n.small(null,"You will lose ",n.strong(null,t.formatSatoshis(this.waveCrashLoss())," bits")," if you crash")),n.div({style:{padding:"10px"}},"Reward: ",n.input({type:"number",value:this.state.rewardText,onChange:this.setRewardText,min:.01,step:.01})," bits @ flight level: ",n.input({type:"number",value:this.state.flightLevel,onChange:this.tentativeFlightLevel,min:1,max:20}),n.br(null),e,n.br())}}),o=function(){this.balance=200};o.prototype.maxLevel=function(e){return Math.floor(Math.log((e+this.balance)/e)/Math.log(2))};var u=new o,a=e.createClass({getInitialState:function(){return{tentativeFlightLevel:4}},setTentativeFlightLevel:function(e){this.setState({tentativeFlightLevel:e})},render:function(){return n.div(null,"Balance: ",u.balance,n.br(),i({engine:u,tentativeFlightLevel:this.state.tentativeFlightLevel}),s({engine:u,tentativeFlightLevel:this.state.tentativeFlightLevel,setTentativeFlightLevel:this.setTentativeFlightLevel}))}});e.renderComponent(a(null),document.getElementById("game"))});