import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/api";
import { BiImageAdd } from "react-icons/bi";
// import { Box, Text } from 'grommet';
// import { SelectMultiple } from "grommet";
// import { Grommet } from "grommet";
// import { TextArea } from 'grommet';

// const defaultOptions = [
//   'Question',
//   'Recommendation',
//   'Review',
//   'Photo',
//   'Discussion',
// ];

export function TeaRoomForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    body: "",
    tag: "",
  });

  const [img, setImg] = useState("");

  // const [options, setOptions] = useState(defaultOptions);
  // const [valueMultiple, setValueMultiple] = useState([]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImage(e) {
    setImg(e.target.files[0]);
  }

  async function handleUpload() {
    try {
      const uploadImage = new FormData();
      uploadImage.append("picture", img);

      const response = await api.post("/uploadImage/uploadImage", uploadImage);

      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const imgURL = await handleUpload();
      await api.post("/tea-room/post/new-post", { ...form, img: imgURL });

      //FIXME: /post => ver se ta certa e
      navigate(`/post/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="formTitle"></label>
      <input
        type="text"
        id="formTitle"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
      />

      <label htmlFor="formBody"></label>
      <input
        type="textarea"
        id="formBody"
        name="body"
        value={form.body}
        onChange={handleChange}
        placeholder="Text"
      />

      <label htmlFor="formTag">Tags</label>
      <select id="formTag" name="tag" value={form.tag} onChange={handleChange}>
        <option value="Question">Question</option>
        <option value="Recommendation">Recommendation</option>
        <option value="Photo">Photo</option>
        <option value="Review">Review</option>
        <option value="Discussion">Discussion</option>
      </select>

      {/* <Grommet >
        <Box fill align="center" pad="large" gap="large">
          <Text>SelectMultiple Default</Text>
          <SelectMultiple
            value={valueMultiple}
            placeholder="Select"
            options={options}
            onSearch={(text) => {
              const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

              const exp = new RegExp(escapedText, 'i');
              setOptions(defaultOptions.filter((o) => exp.test(o)));
            }}
            onClose={() => setOptions(defaultOptions)}
            onChange={({ value }) => {
              setValueMultiple(value);
            }}
          />
        </Box>
      </Grommet> */}

      <label htmlFor="formImg"><BiImageAdd /></label>
      <input
        name="picture"
        type="file"
        id="formImg"
        onChange={handleImage}
      />

      <button type="submit">Post</button>
    </form>
  );
}

