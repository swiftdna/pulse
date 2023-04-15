import React, {useState, useEffect} from 'react';
import Navbar from './Navbar';
import '../App.css';
import { selectIsLoggedIn, selectUser } from '../selectors/appSelector';
import { useSelector, useDispatch } from 'react-redux';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FaSmile, FaSadTear } from 'react-icons/fa';
import { addPost, getPosts, pollForUpdates } from '../utils';

function Home() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const userObj = useSelector(selectUser);
    const [data, setData] = useState([]);
    const [content, setContent] = useState('');
    const [pollingRequest, setPollingRequest] = useState(null);

    const fetchPosts = () => {
        getPosts(dispatch, (err, data) => {
            setData(data);
        });
    };

    // const poll = () => {
    //     const last_count = data.length;
    //     if (pollingRequest) {
    //       pollingRequest.abort();
    //     }
    //     const request = pollForUpdates(dispatch, last_count, (err, pll_data) => {
    //         setData(pll_data);
    //         // poll();
    //     });
    //     setPollingRequest(request);
    // };

    useEffect(() => {
        fetchPosts();
    }, []);

    // useEffect(() => {
    //     // poll();
    // }, [data]);

    useEffect(() => {
        const last_count = data && data.length ? data.length : 0;
        const fetchData = async (count) => {
          const response = await fetch('/api/poll?last_count=' + count);
          const newData = await response.json();
          const { data } = newData;
          setData(data);
        };

        if (!last_count) {
            return;
        }

        const interval = setTimeout(() => {
          fetchData(last_count);
        }, 1000);

        return () => clearTimeout(interval);
    }, [data]);

    const postContent = () => {
        const {id, username} = userObj;
        const data = {
            user_id: id,
            username,
            sentiment: Date.now() % 2 === 0 ? 'positive' : 'negative',
            content
        };
        addPost(dispatch, data, (err, success) => {
            setContent('');
            fetchPosts();
        });
    };
    
    return(
        <div className="container pull-down">
            {isLoggedIn ?
                <h5>Welcome {userObj.username}!</h5> : 
                <h5>Hello, login or register to access the page!</h5>}
            <>
                <Row>
                    <FloatingLabel className="lbl_postcontent" controlId="postContent" label="What's on your mind?">
                        <Form.Control
                          as="textarea"
                          value={content}
                          placeholder="Leave a comment here"
                          style={{ height: '100px' }}
                          onChange={(e) => setContent(e.target.value)}
                        />
                    </FloatingLabel>
                </Row>
                <Row>
                    <div>
                    <Button variant="primary" className="post_btn" onClick={() => postContent()}>Share</Button>
                    </div>
                </Row>
                <div className="card_frame">
                    {data.map(dt =>
                        <Card className="card_outline">
                          <Card.Body>
                            <Card.Title>{dt.username} <span className="when">{dt.created_date}</span> <span className={`sentiment ${dt.sentiment}`}>{dt.sentiment === 'positive' ? <FaSmile /> : <FaSadTear />}</span></Card.Title>
                            <Card.Text>
                              {dt.content}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                    )}
                </div>
            </>
        </div>
    )
}

export default Home;