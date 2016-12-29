let Board = React.createClass({
    getInitialState(){
      return {context: []}
    },
    handelClick(event){
        var val = this.refs.myInp.value;
        if(val && ( event.target.id == 'btn'|| event.keyCode == 13)){
            this.state.context.push(val);
            console.log(this.state.context);
            this.setState({context: this.state.context});
            this.refs.myInp.value = '';
        }
    },
 render(){
     return (
         <div className="panel panel-default">
             <div className="panel-heading">
                <h1>珠峰留言板</h1>
             </div>
             <div className="panel-body">
                <ul className="list-group">
                    {
                        this.state.context.map((item,ind) => {
                         return <li className="list-group-item" key={ind}>{item}</li>
                    })
                    }
                </ul>
             </div>
             <div className="panel-footer text-center">
                 <input type="text" ref="myInp"   className="form-control" onKeyDown ={this.handelClick}/><br/>
                 <button className="btn btn-primary" id="btn" onClick={this.handelClick}>留言</button>
             </div>
         </div>
     )
 }
});
ReactDOM.render(<Board/>,document.querySelector('#container'));