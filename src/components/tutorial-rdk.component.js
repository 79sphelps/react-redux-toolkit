// import React, { useState, useEffect } from "react";
import React, { useEffect } from "react";
import TutorialDataService from "../services/tutorial.service";

import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentTutorial,
  selectMessage,
  setCurrentTutorial,
  setMessage,
  setTutorials,
  updateTutorial,
  deleteTutorial,
} from '../redux/storeSlice';

const Tutorial = props => {
  // const initialTutorialState = {
  //   id: null,
  //   title: "",
  //   description: "",
  //   published: false
  // };

  const dispatch = useDispatch();

  // const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  // const [message, setMessage] = useState("");
  // dispatch(setCurrentTutorial(initialTutorialState));
  // dispatch(setMessage(''));

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const retrieveTutorials = () => {
    TutorialDataService.getAll()
      .then(response => {
        // setTutorials(response.data);
        dispatch(setTutorials(response.data));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  let currentTutorial = useSelector(selectCurrentTutorial);

  const message = useSelector(selectMessage);

  // const getTutorial = id => {
  //   TutorialDataService.get(id)
  //     .then(response => {
  //       // setCurrentTutorial(response.data);
  //       dispatch(setCurrentTutorial(response.data));
  //       console.log(response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  // useEffect(() => {
  //   getTutorial(props.match.params.id);
  // }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    // setCurrentTutorial({ ...currentTutorial, [name]: value });
    dispatch(setCurrentTutorial({ ...currentTutorial, [name]: value }));
  };

  const updatePublished = status => {
    var data = {
      id: currentTutorial._id,
      title: currentTutorial.title,
      description: currentTutorial.description,
      published: status
    };

    TutorialDataService.update(currentTutorial._id, data)
      .then(response => {
        // setCurrentTutorial({ ...currentTutorial, published: status });
        dispatch(setCurrentTutorial({ ...currentTutorial, published: status }));
        dispatch(setMessage(`The tutorial was ${data.published ? 'published' : 'unpublished'} successfully!`));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateTutorialUnderEdit = () => {
    TutorialDataService.update(currentTutorial._id, currentTutorial)
      .then(response => {
        console.log(response.data);
        // setMessage("The tutorial was updated successfully!");
        dispatch(updateTutorial({ id: currentTutorial._id, tutorial: currentTutorial }));
        dispatch(setMessage('The tutorial was updated successfully!'));
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTutorialUnderEdit = () => {
    TutorialDataService.delete(currentTutorial._id)
      .then(response => {
        console.log(response.data);
        props.history.push("/tutorials");
        dispatch(deleteTutorial(currentTutorial._id));
        dispatch(setMessage('The tutorial was deleted successfully!'));
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTutorial ? (
        <div className="edit-form">
          <h4>Tutorial</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentTutorial.title}
                onChange={(currentTutorial) => handleInputChange(currentTutorial)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentTutorial.description}
                onChange={(currentTutorial) => handleInputChange(currentTutorial)}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTutorial.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentTutorial.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={() => deleteTutorialUnderEdit()}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={() => updateTutorialUnderEdit()}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default Tutorial;