// import React, { useState } from "react";
import React from "react";
import TutorialDataService from "../services/tutorial.service";

import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentTutorial,
  selectSubmitted,
  setCurrentTutorial,
  setSubmitted,
} from '../redux/storeSlice';


const AddTutorial = () => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false
  };

  const dispatch = useDispatch();

  // const [tutorial, setTutorial] = useState(initialTutorialState);
  // const [submitted, setSubmitted] = useState(false);
  // dispatch(setCurrentTutorial(initialTutorialState));
  // dispatch(setSubmitted(false));

  const tutorial = useSelector(selectCurrentTutorial);
  const submitted = useSelector(selectSubmitted);

  const handleInputChange = event => {
    const { name, value } = event.target;
    // setTutorial({ ...tutorial, [name]: value });
    dispatch(setCurrentTutorial({ ...tutorial, [name]: value }))
  };

  const saveTutorial = () => {
    var data = {
      title: tutorial.title,
      description: tutorial.description
    };

    TutorialDataService.create(data)
      .then(response => {
        // setTutorial({
        //   id: response.data.id,
        //   title: response.data.title,
        //   description: response.data.description,
        //   published: response.data.published
        // });

        dispatch(setCurrentTutorial({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        }))

        // setSubmitted(true);
        dispatch(setSubmitted(true));

        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    // setTutorial(initialTutorialState);
    dispatch(setCurrentTutorial(initialTutorialState));
    // setSubmitted(false);
    dispatch(setSubmitted(false));
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={() => newTutorial()}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={tutorial.title}
              onChange={(event) => handleInputChange(event)}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={tutorial.description}
              onChange={(event) => handleInputChange(event)}
              name="description"
            />
          </div>

          <button onClick={() => saveTutorial(tutorial)} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTutorial;