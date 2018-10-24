const axios = require('axios');



export default class Registration {
    constructor(props){
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this)

    }
    handleChange(e){
        this[e.target.name] = e.target.value;
    }
    register(){
        axios.post('/register', ) //in view we would have used v-model, here you manually add a change handler
        first: this.first
    }).then({data}) =>{
        if(data.success){
            location.replace('/');
        }else{
            this.setState({
                error: true
            })
        }
    }
    render(){
        return (
            <div>
                {
                    this.state.error && <div class="error">Try again</div>}
                    <input name="first" onChange =(this.handleChange)/>
                    <input />
                    <input />
                    <input />

                    <button onClick = {this.register}></button>
                }
        )
    }
}
