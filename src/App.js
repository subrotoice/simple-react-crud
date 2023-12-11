import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [titleEdit, setTitleEdit] = useState("");
  const [id, setId] = useState(0);
  const [items, setItems] = useState(
    localStorage.getItem("items") == null
      ? []
      : JSON.parse(localStorage.getItem("items"))
  );
  const ref = useRef(null);
  const submit = (e) => {
    e.preventDefault();
    let item = {
      id: items.length == 0 ? 1 : items[0].id + 1,
      title: title,
    };
    console.log(item);
    setItems([item, ...items]);
    setTitle("");
  };
  const handelEdit = (e) => {
    e.preventDefault();
    setItems(
      items.map((currentItem) =>
        id == currentItem.id
          ? { ...currentItem, title: titleEdit }
          : currentItem
      )
    );
    setId(0);
  };
  const onDelete = (item) => {
    setItems(items.filter((value) => item.id != value.id));
  };
  const onEdit = (item) => {
    setTitleEdit(item.title);
    setId(item.id);
    // ref.current.select();
  };
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items, id]);
  return (
    <div className="App">
      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Item Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      {items.length > 0 ? (
        <ol>
          {items.map((item) => (
            <li>
              <div className="itemTitle">
                {item.id != id ? (
                  item.title
                ) : (
                  <form onSubmit={handelEdit}>
                    <input
                      type="text"
                      className="editInput"
                      value={titleEdit}
                      ref={ref}
                      onChange={(e) => setTitleEdit(e.target.value)}
                    />

                    <button type="submit">Save</button>
                    <button onClick={() => setId(0)}>Cancel</button>
                  </form>
                )}
              </div>
              {item.id != id && (
                <>
                  <button onClick={() => onEdit(item)}>Edit</button>
                  <button onClick={() => onDelete(item)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ol>
      ) : (
        "No item found"
      )}
    </div>
  );
}

export default App;
