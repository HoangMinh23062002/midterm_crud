import React, { Component } from 'react';

import axios from 'axios';

import { toast } from 'react-toastify';


class Admin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      news: [],
      id: '',
      title: '',
      image: '',
      content: '',
      author: '',
      datecreate: ''

    }
    this.onDelete = this.onDelete.bind(this);
    this.onChange = this.onChange.bind(this);
    this.showEditNews = this.showEditNews.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    var { match } = this.props;
    if (match) {
      var id = match.params.id;
      axios({
        method: 'GET',
        url: `https://629191d6cd0c91932b64d9c6.mockapi.io/midterm/${id}`,
        data: null
      }).then(res => {
        var data = res.data;
        this.setState({
          id: data.id,
          title: data.title,
          image: data.image,
          content: data.content,
          author: data.author,
          datecreate: data.datecreate
        });
      }).catch(err => {
      });
    }
    axios.get('https://629191d6cd0c91932b64d9c6.mockapi.io/midterm').then(res => {
      this.setState({ news: res.data });
    })
    if (this.state.id === '') {
      document.getElementById('image-edit').style.display = 'none';
    } else {
      document.getElementById('image-edit').style.display = 'block';
    }
  }
  getNews = (id) => {
    for (var i = 0; i < this.state.news.length; i++) {
      if (this.state.news[i].id === id) {
        return this.state.news[i];
      }
    }
    return null;
  }
  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  onChangeImage = (event) => {
    this.setState({
      [event.target.name]: "images/" + event.target.files[0].name,
    });
    console.log(event.target.files[0].name);
  }
  showEditNews = (id) => {
    var newss = this.getNews(id);
    this.setState({
      id: newss.id,
      title: newss.title,
      author: newss.author,
      content: newss.content,
      image: newss.image,
      datecreate: newss.datecreate,
    });
    document.getElementById('image-edit').style.display = 'block';
    alert(id);
  }
  getIndexnews = (id) => {
    for (var i = 0; i < this.state.news.length; i++) {
      if (this.state.news[i].id === id) {
        return i;
      }
    }
    return -1;
  }
  onSave = (event) => {
    event.preventDefault();
    if (this.state.id === '') {
      if (this.state.title !== '' && this.state.content !== '' && this.state.author !== '' && this.state.image !== '' && this.state.datecreate !== '') {
        axios({
          method: 'POST',
          url: `https://629191d6cd0c91932b64d9c6.mockapi.io/midterm`,
          data: {
            title: this.state.title,
            author: this.state.author,
            content: this.state.content,
            image: this.state.image,
            datecreate: this.state.datecreate,
          }

        }).then(res => {
          this.componentDidMount();
          alert("Successfully");
        })
      } else {
        alert("Empty something");
        return
      }
    } else {
      axios({
        method: 'PUT',
        url: `https://629191d6cd0c91932b64d9c6.mockapi.io/midterm/${this.state.id}`,
        data: {
          title: this.state.title,
          author: this.state.author,
          content: this.state.content,
          image: this.state.image,
          datecreate: this.state.datecreate,
        }

      }).then(res => {
        this.componentDidMount();
        alert("Successfully");
      })
    }
    this.setState({
      id: '',
      title: '',
      image: '',
      content: '',
      author: '',
      datecreate: ''
    });
  }
  onDelete = (id) => {
    console.log(id);
    axios({
      method: 'DELETE',
      url: `https://629191d6cd0c91932b64d9c6.mockapi.io/midterm/${id}`,
      data: null
    }).then(res => {
      if (res.status === 200) {
        var index = this.getIndexnews(id);
        if (index !== -1) {
          var news = this.state.news;
          news.splice(index, 1);
        }
        this.setState({
          news: news
        });
        alert(id);
        toast.success("Xóa sản phẩm thành công", {
        })

      }
    });
  }
  render() {
    console.log(this.state);
    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <form onSubmit={this.onSave}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Title</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={this.state.title}
                  onChange={this.onChange}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter title"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Contnet</label>
                <input
                  type="text"
                  name="content"
                  onChange={this.onChange}
                  defaultValue={this.state.content}
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Content"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail2">Author</label>
                <input
                  type="text"
                  name="author"
                  onChange={this.onChange}
                  defaultValue={this.state.author}
                  className="form-control"
                  id="exampleInputEmail2"
                  aria-describedby="emailHelp"
                  placeholder="Enter author"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail2">Date</label>
                <input
                  type="date" name="datecreate"
                  onChange={this.onChange}
                  defaultValue={this.state.datecreate}
                  className="form-control"
                  id="exampleInputEmail2"
                  aria-describedby="emailHelp"
                  placeholder="Enter date"
                />
              </div>
              <div className="form-group">
                <label>Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={this.onChangeImage}
                  className="form-control"
                  placeholder="image"
                />
              </div>
              <div className="form-group" id="image-edit" style={{ display: "none" }}>
                <label>Image</label>
                <img src={"./" + this.state.image} style={{ width: "100px" }} />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
          <div className="col-9">
            <h1>List news</h1>
            <table className='table-news'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>TITLE</th>
                  <th>IMAGE</th>
                  <th>CONTENT</th>
                  <th className='date-news'>AUTHOR</th>
                  <th className='date-news'>DATE</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.news.map((newss) => (
                    <tr>
                      <td>{newss.id}</td>
                      <td> <h5 className="card-title">{newss.title}</h5></td>
                      <td><img className="image-news" src={"./" + newss.image} alt="Card image cap" /></td>
                      <td><h8 className="card-title">{newss.content}</h8></td>
                      <td>{
                        newss.author
                      }</td>
                      <td>{

                        newss.datecreate
                      }</td>
                      <td><button className="btn btn-primary" role="button" href="#" onClick={() => this.showEditNews(newss.id)}>
                        Edit
                      </button>
                        <button className="btn btn-danger" onClick={() => this.onDelete(newss.id)}>
                          delete
                        </button>
                      </td>
                    </tr>
                  )
                  )}

              </tbody>
            </table>

          </div>
        </div>

      </div>
    );
  }
}

export default Admin;