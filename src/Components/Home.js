import React from "react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { BsSearch } from "react-icons/bs";
import { GiCancel } from "react-icons/gi";

function Home() {
  const mystyle = {
    marginLeft: "800px",
    marginTop: "20px",
    fontWeight: "700",
  };

  const [popup, setPop] = useState(false);
  const [postDisplay, setPostDisplay] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
  });
  const [inputFormData, setInputFormData] = useState([]);
  const [records, setRecords] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [markdown, setMarkdown] = useState("This is MarkDown");
  const [titleErr, settitleErr] = useState(false);
  const [descriptionErr, setdescriptionErr] = useState(false);

  function loginHandle(e) {
    if (formValues.name.length < 10 || markdown.length < 100) {
      settitleErr(true);
      setdescriptionErr(true);
      alert("type correct values");
    } else {
      alert("all good :)");
    }

    e.preventDefault();
  }

  const handleClickOpen = () => {
    setPop(!popup);
  };
  const closePopup = () => {
    setPop(false);
  };
  function handleClickOpenPosts() {
    setPostDisplay(!postDisplay);
  }

  const handleChangeForm = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  let { name } = formValues;

  function handleCreatePost(e) {
    if (formValues.name.length < 10 || markdown.length < 100) {
      settitleErr(true);
      setdescriptionErr(true);
      alert("type correct values");
    } else {
      alert("all good :)");
      e.preventDefault();
      setInputFormData([...inputFormData, { name, markdown }]);
      setRecords([...inputFormData, { name, markdown }]);
      setFormValues({ name: "", markdown: "" });
      setMarkdown("");
    }
    settitleErr(false);
    setdescriptionErr(false);
  }
  //   console.log(inputFormData);
  //   console.log(formValues);
  //   console.log(markdown);

  const filter = (event) => {
    setRecords(
      inputFormData.filter(
        (fil) =>
          fil.markdown.toLowerCase().includes(event.target.value) ||
          fil.name.toLowerCase().includes(event.target.value)
      )
    );
    setSearchVal(event.target.value);
  };
  function clearSeach() {
    setSearchVal("");
  }

  console.log(records);
  return (
    <>
      <header>
        <nav>
          <div class="left">Shripad Portpolio</div>
          <div class="right">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/">About</a>
              </li>
              <li>
                <a href="/">Projects</a>
              </li>
              <li>
                <a href="/">Services</a>
              </li>
              <li>
                <a href="/">Contact Me</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <main>
        <section className="topSection">
          <div className="topSearchbar">
            <input type="search" placeholder="Search.." onChange={filter} />{" "}
          </div>
        </section>
        <section className="middleSection">
          <div>
            {" "}
            <button onClick={handleClickOpen}>New Post</button>{" "}
          </div>
          <div>
            <button onClick={handleClickOpenPosts}>Published</button>
          </div>
        </section>

        <section className="bottomSection">
          <section className="leftSection">
            {popup ? (
              <form style={{ border: "2px solid gray" }} onSubmit={loginHandle}>
                <label for="title">
                  <b>Title</b>
                </label>
                <span style={{ marginLeft: "87%", fontSize: "2rem" }}>
                  {" "}
                  <button onClick={closePopup}> X</button>{" "}
                </span>
                <br />
                <input
                  type="text"
                  placeholder="Enter Title"
                  name="name"
                  value={formValues.name}
                  onChange={handleChangeForm}
                  required
                />
                {titleErr ? (
                  <div style={{ color: "red" }}>Title Not Valid</div>
                ) : (
                  ""
                )}
                <br />
                <label for="Description">
                  <b>Description:</b>
                </label>
                <div className="centerText">
                  <textarea
                    className="leftSide"
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                  >
                    {" "}
                  </textarea>

                  <div>
                    <ReactMarkdown></ReactMarkdown>
                  </div>
                  {descriptionErr ? (
                    <div style={{ color: "red" }}>Description Not Valid</div>
                  ) : (
                    ""
                  )}
                </div>
                <div style={{ marginLeft: "40%", padding: "15px" }}>
                  <button
                    type="submit"
                    onClick={handleCreatePost}
                    value="Submit"
                  >
                    Publish
                  </button>
                </div>
              </form>
            ) : (
              <></>
            )}
          </section>

          <section class="rightSection">
            {postDisplay ? (
              records.map((obj, i) => {
                <span>x</span>;
                return (
                  <>
                    <div className="row">
                      <div className="leftcolumn">
                        <div className="card">
                          <p>{obj.name}</p>
                          <p>{obj.markdown}</p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <></>
            )}
            <img src="developer-png.png" alt=""></img>
          </section>
        </section>
      </main>
      <footer>
        <div class="footer">
          <div class="footer-first">
            <h3>Shripad Developer Portfollio</h3>
          </div>
          <div class="footer-second">
            <ul>
              <li>Home</li>
              <li>Projects</li>
              <li>Services</li>
              <li>About</li>
              <li>Contact Me</li>
            </ul>
          </div>
          <div class="footer-third">
            <ul>
              <li>Home</li>
              <li>Projects</li>
              <li>Services</li>
              <li>About</li>
              <li>Contact Me</li>
            </ul>
          </div>
          <div class="footer-fourth">
            <ul>
              <li>Home</li>
              <li>Projects</li>
              <li>Services</li>
              <li>About</li>
              <li>Contact Me</li>
            </ul>
          </div>
        </div>
        <div class="footerrights">
          www.ShripaPortfollio.com | All rights reserved.
        </div>
      </footer>
    </>
  );
}
export default Home;
