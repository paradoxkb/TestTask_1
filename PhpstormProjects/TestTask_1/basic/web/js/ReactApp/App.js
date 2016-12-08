/**
 * Created by watcher on 12/7/16.
 */

class PostsList extends React.Component {
    constructor (props) {
        super(props)
        this.state = {posts: []}
        this.addPostHandler = this.addPostHandler.bind(this)
        this.actionPostHandler = this.actionPostHandler.bind(this)
    }
    componentWillMount() {
        $.post('/posts/getposts/', {}, response => {
            // console.log(response)
            // let products = response.slice(1)
            this.setState({posts: response})
        }, 'json')
    }
    addPostHandler () {
        let postToAdd = {
            id: Math.floor(Math.random() * 100000),
            title: this.refNewPostTitle.value,
            text: this.refNewPostText.value
        },
            currentPosts = this.state.posts
        currentPosts.push(postToAdd)
        this.refNewPostText.value = ''
        this.refNewPostTitle.value = ''
        $.post('/posts/insert/', {newObject: postToAdd}, response => {
            console.log(response)
        }, 'json')
        this.setState({posts: currentPosts})
    }
    actionPostHandler (action, target, newObject) {
        let currentPosts = this.state.posts,
            newPosts = []
        switch (action) {
            case 'delete':
                newPosts = currentPosts.filter(post => {
                    return post.id !== target
                })
                $.post('/posts/remove/', {target}, response => {
                    console.log(response)
                }, 'json')
                this.setState({posts: newPosts})
                break
            case 'save':
                newPosts = currentPosts.map(post => {
                    return (post.id == target) ? newObject : post
                })
                $.post('/posts/save/', {target, newObject}, response => {
                    console.log(response)
                }, 'json')
                this.setState({posts: newPosts})
                break
        }
        return
    }
    render () {
        // console.log(this.state.posts)
        return (
            <div>
                <table className="col-xs-12 table-hover table-bordered" id="table_posts">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Text</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.posts.map((post, i) => {
                        return (
                            <Post
                                key={Math.random()}
                                post={post}
                                postNum={i+1}
                                actionPostHandler={this.actionPostHandler}
                            />
                        )
                    })}
                    <tr>
                        <td>#</td>
                        <td><input type="text" className="form-control" ref={ref => this.refNewPostTitle = ref} placeholder="Title"/></td>
                        <td><input type="text" className="form-control" ref={ref => this.refNewPostText = ref} placeholder="Text"/></td>
                        <td><input type="button" className="btn btn-success" value="Add Post" onClick={this.addPostHandler}/></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
class Post extends React.Component {
    constructor (props) {
        super(props)
        this.state = {post: props.post, postNum: props.postNum}
        this.actionPostHandler = this.actionPostHandler.bind(this)
    }
    actionPostHandler(event) {
        const action = event.target.name
        let newState = {},
            newObj = {}
        switch (action) {
            case 'edit':
                newState = {
                    ...this.state.post,
                    toEdit: 1
                }
                this.setState({post: newState})
                break
            case 'delete':
                this.props.actionPostHandler('delete', this.state.post.id)
                break
            case 'save':
                newObj = {
                    id: this.state.post.id,
                    title: this.refEditPostTitle.value,
                    text: this.refEditPostText.value
                }
                this.props.actionPostHandler('save', this.state.post.id, newObj)
                break
        }
        return
    }
    render () {
        let { title, text } = this.state.post
        let i = this.state.postNum
        if(this.state.post.toEdit) {
            return (
                <tr>
                    <td>{i}</td>
                    <td><input type="text" className="form-control" ref={ref => this.refEditPostTitle = ref} defaultValue={title} /></td>
                    <td><input type="text" className="form-control" ref={ref => this.refEditPostText = ref} defaultValue={text} /></td>
                    <td>
                        <input type="button" className="btn btn-success" name="save" value="Save" onClick={this.actionPostHandler}/>
                    </td>
                </tr>
            )
        }
        return (
            <tr>
                <td>{i}</td>
                <td>{title}</td>
                <td>{text}</td>
                <td>
                    <input type="button" className="btn btn-default" name="edit" value="Edit" onClick={this.actionPostHandler}/>&nbsp;
                    <input type="button" className="btn btn-danger" name="delete" value="Delete" onClick={this.actionPostHandler}/>
                </td>
            </tr>
        )
    }
}

class App extends React.Component {
    render () {
        return (
            <div>
                <h3>Posts</h3>
                <PostsList/>
            </div>
        )
    }
}

Post.propTypes = {
    post: React.PropTypes.object.isRequired,
    postNum: React.PropTypes.number.isRequired
}

ReactDOM.render(
    <App/>,
    document.getElementById('mount_point')
)