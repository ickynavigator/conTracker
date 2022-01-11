import { message } from "antd";
import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { DragnDrop, MetaHead } from "../../components/ui";
import styles from "../../styles/Missing.module.css";
import { submitMissing } from "../../utils/api";

const index = () => {
  const pageTitle = "Report a Missing Person";
  const [validated, setValidated] = useState(false);
  const [successMsg, setsuccessMsg] = useState("");
  const [errorMsg, seterrorMsg] = useState("");

  const [name, setname] = useState("");
  const [dob, setdob] = useState("");
  const [location, setlocation] = useState("");
  const [height, setheight] = useState("");
  const [weight, setweight] = useState("");
  const [eyeColor, seteyeColor] = useState("");
  const [hairColor, sethairColor] = useState("");
  const [race, setrace] = useState("");
  const [gender, setgender] = useState("");

  const [files, setFiles] = useState("");
  const [fileTypes, setfileTypes] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [UploadedImage, setUploadedImage] = useState("");

  // eslint-disable-next-line consistent-return
  async function handleFileDrop(foo) {
    const fileList = foo[0];
    // check if file is there
    if (!fileList) return message.error("No file selected");
    // check if file is an image
    if (!fileList.type.match("image/"))
      return message.error("File must be an image");
    // check if file is larger than 1mb
    if (fileList.size > 1000000)
      return message.error("File is larger than 1mb");

    const currentIDImage = URL.createObjectURL(fileList);
    setfileTypes(fileList.type);
    setPreviewImage(currentIDImage);
    setFiles(fileList);
  }

  // eslint-disable-next-line consistent-return
  async function checkSetFile(e) {
    if (!e.target.files) return message.error("No file selected");
    const fileList = e.target.files[0];
    // check if file is an image
    if (!fileList.type.match("image/"))
      return message.error("File must be an image");
    // check if file is larger than 1mb
    if (fileList.size > 1000000)
      return message.error("File is larger than 1mb");

    const currentIDImage = URL.createObjectURL(e.target.files[0]);
    setfileTypes(fileList.type);
    setPreviewImage(currentIDImage);
    setFiles(fileList);
  }

  async function handleFileUpload() {
    if (!files) return message.error("No file selected");
    const formData = new FormData();
    formData.append("file", files);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET);
    const options = { method: "POST", body: formData };
    return (
      fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL, options)
        .then(res => res.json())
        .then(res => {
          // eslint-disable-next-line camelcase
          const { secure_url } = res;
          setUploadedImage(secure_url);
        })
        // eslint-disable-next-line consistent-return
        .then(() => {
          if (!UploadedImage) {
            message.success("ID Uploaded");
            return UploadedImage;
          }
          message.error("An error has occured. Please try again");
          seterrorMsg("An error has occured. Please try again");
        })
        .catch(() => {
          message.error("An error has occured. Please try again");
          seterrorMsg("An error has occured. Please try again");
        })
    );
  }

  const handleSubmit = async event => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      seterrorMsg("Please fill out all fields");
      return;
    }

    setValidated(true);

    const uploaded = await handleFileUpload();
    if (!uploaded) return;

    const formDetails = {
      name,
      dob,
      location,
      height,
      weight,
      eyeColor,
      hairColor,
      race,
      gender,
      images: [UploadedImage],
    };
    const data = await submitMissing(formDetails);

    if (data.status === 200)
      setsuccessMsg("Your report has been submitted successfully");
    else seterrorMsg("There was an error submitting your report");
  };

  useEffect(() => {
    (async () => {
      if (previewImage && files === undefined) {
        await fetch(previewImage)
          .then(r => r.blob())
          .then(
            blobFile =>
              new File([blobFile], new Date().toDateString(), {
                type: fileTypes,
              }),
          )
          .then(res => setFiles(res));
      }
    })();
  }, []);

  return (
    <>
      <MetaHead title={pageTitle} />

      <div className="title-banner w-full">
        <h1 className="text-center">REPORT A MISSING PERSON</h1>
      </div>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="mx-5 my-3"
      >
        {successMsg && <Alert variant="success">{successMsg}</Alert>}
        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
        <Row xs={1} md={2}>
          <Col>
            <Form.Group controlId="Name" className="my-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                value={name}
                onChange={e => setname(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="dob" className="my-2">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                required
                type="date"
                value={dob}
                onChange={e => setdob(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Date of Birth.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="location" className="my-2">
              <Form.Label>Location (Last Seen)</Form.Label>
              <Form.Control
                required
                type="text"
                value={location}
                onChange={e => setlocation(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Location.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="height" className="my-2">
              <Form.Label>Height (cm)</Form.Label>
              <Form.Control
                required
                type="number"
                value={height}
                onChange={e => setheight(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Height.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="weight" className="my-2">
              <Form.Label>Weight (kg)</Form.Label>
              <Form.Control
                required
                type="number"
                value={weight}
                onChange={e => setweight(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Weight.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="eyeColor" className="my-2">
              <Form.Label>Eye Color</Form.Label>
              <Form.Control
                required
                type="text"
                value={eyeColor}
                onChange={e => seteyeColor(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Eye Color.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="hairColor" className="my-2">
              <Form.Label>Hair Color</Form.Label>
              <Form.Control
                required
                type="text"
                value={hairColor}
                onChange={e => sethairColor(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Hair Color.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="race" className="my-2">
              <Form.Label>Race</Form.Label>
              <Form.Control
                required
                type="text"
                value={race}
                onChange={e => setrace(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Race.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="gender" className="my-2">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                required
                value={gender}
                onChange={e => setgender(e.target.value)}
              >
                <option disabled>Choose a Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="OTHER">Other</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please provide a valid Gender.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col className="d-flex justify-content-center">
            <label
              htmlFor="image-upload"
              styles={{
                border: "1px solid gray",
                "border-radius": "5px",
                padding: "5px",
                "margin-top": "10px",
                position: "relative",
              }}
            >
              {/* eslint-disable-next-line react/jsx-no-bind */}
              <DragnDrop handleFileDrop={handleFileDrop}>
                <div className={styles.pictureWrapper}>
                  <div>
                    {previewImage && (
                      <div className={styles.previewWrapper}>
                        <img
                          src={previewImage}
                          alt="preview"
                          className="h-100"
                        />
                      </div>
                    )}
                    <p className={styles.fileChoice}>
                      <i className="" />
                      Choose file <i className="fas fa-caret-down" />
                    </p>
                    <p className={styles.formatText}>
                      Supported formats: JPG, PNG, JPEG. File size limit is 1MB{" "}
                      <br />
                      Recommended dimension : 1920 X 1080 px
                    </p>
                  </div>
                </div>
                <input
                  type="file"
                  id="image-upload"
                  name="image-upload"
                  accept=".png, .jpg, .jpeg, image/*"
                  onChange={e => checkSetFile(e)}
                  style={{ zIndex: "-1" }}
                  className="position-absolute overflow-hidden w-100 opacity-0 h-100"
                />
              </DragnDrop>
            </label>
          </Col>
        </Row>
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
};

export default index;
