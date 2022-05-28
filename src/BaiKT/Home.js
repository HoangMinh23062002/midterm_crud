import React, { Component } from 'react';
import axios from 'axios';
import '../asset/home.css'
//import {toast} from 'react-toastify';
// import Formnhap from './Formnhap';
// import Formnhap from './Formnhap';
class Home extends Component {
   constructor(props) {
      super(props);
      this.state={
        news2: [],
      id: '',
      title: '',
      image : '',
      content: '',
      author : '',
      datecreate : ''
      }
      //this.onChange = this.onChange.bind(this);
      this.showEditProduct = this.showEditProduct.bind(this);
      this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount() {
      var {match} = this.props;
      if (match) {
        var id = match.params.id;
        axios({
        method: 'GET',
        url :`https://629191d6cd0c91932b64d9c6.mockapi.io/midterm/${id}`,
        data : null
       }).then(res =>{
        var data = res.data;
          this.setState({
            id: data.id,
            title: data.title,
            image : data.image,
            content: data.content,
            author : data.author,
            datecreate : data.datecreate
          });
        }).catch( err =>{
      });
     }
      axios.get('https://629191d6cd0c91932b64d9c6.mockapi.io/midterm').then(res => {
        this.setState({ news2:  res.data});
      })
      
    }
    getProduct = (id) => {
      for(var i=0; i<this.state.news2.length; i++) {
        if (this.state.news2[i].id === id) {
          return this.state.news2[i];
        }
      
      return null;
    }
    
    }
    showEditProduct = (id) => {
      var news2s = this.getProduct(id);
      this.setState({
        id: news2s.id,
      title: news2s.title,
      author: news2s.author,
      content: news2s.content,
      image : news2s.image,
      datecreate : news2s.datecreate,
       
      });
      document.getElementById('image-edit').style.display = 'block';
      alert(id);
    }
    getIndexnews2 = (id) => {
      for(var i=0; i<this.state.news2.length; i++) {
        if (this.state.news2[i].id === id) {
          return i;
        }
      }
      return -1;
    }
    
   
      
    
  render(){
    return (
 
        <div className='container'>
          <h1>THẾ GIỚI</h1>
          <div className='d-flex'>
        
        
          
           {  this.state.news2.map((news2s) =>(
        
        
        <div className="row content-content">
        <div className="col-md-8">
          
          <div className="row content-content">
            <div className="col-md-6">
            <img className="card-img-top" style={{width: "220px"}} src={"./"+news2s.image} alt="Card image cap" />
                <div className="card-body">
                <h5 className="card-title">{news2s.title}</h5>
                  <div className="row">
                    <div className="col-6">
                        {
                          news2s.datecreate
                        }
                    </div>
                    <div className="col-6">
                        {
                          news2s.author
                        }
                    </div>
                  </div>
                  <h8 className="card-title">{news2s.content}</h8>
                </div>
            </div>
            
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
      
           ))}
           </div>
           </div>                    
        );
  }
}

 
export default Home;
 

