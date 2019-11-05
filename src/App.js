import React, { useState, useRef, useCallback } from "react";
import produce from "immer";

const App = () => {
  const nextId = useRef(1);
  const [form, setForm] = useState({ name: "", username: "" });
  const [data, setData] = useState({
    array: [],
    uselessValue: null
  });

  const onChange = useCallback(
    e => {
      // setForm({
      //   ...form,
      //   [e.target.name]: e.target.value
      // });

      // immer 적용
      setForm(
        produce(form, draft => {
          draft[form.name] = form.value;
        })
      );
    },
    [form]
  );

  const onSubmit = useCallback(
    e => {
      console.log("등록");
      console.log(form);

      e.preventDefault();
      const info = {
        id: nextId.current,
        name: form.name,
        username: form.username
      };

      // setData({
      //   ...data,
      //   array: data.array.concat(info)
      // });

      // immer 사용
      setData(
        produce(data, draft => {
          draft.data.push(info);
        })
      );
      setForm({
        name: "",
        username: ""
      });
      nextId.current += 1;
    },
    [data, form]
  );

  const onRemove = id => {
    // setData({
    //   ...data,
    //   array: data.array.filter(info => info.id !== id)
    // });
    // immer 적용
    setData(
      produce(data, draft => {
        draft.array.splice(draft.array.findIndex(info => info.id === id), 1);
      })
    );
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="username"
          placeholder="아이디"
          value={form.username}
          onChange={onChange}
        />
        <input
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={onChange}
        />
        <button type="submit">등록</button>
      </form>
      <div>
        <ul>
          {data.array.map(info => {
            return (
              <li key={info.id} onClick={() => onRemove(info.id)}>
                {info.username} ({info.name})
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default App;
