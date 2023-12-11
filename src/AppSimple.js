import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function AppSimple() {
  const [title, setTitle] = useState("");
  const [id, setId] = useState(0);
  const [items, setItems] = useState(
    localStorage.getItem("items") == null
      ? []
      : JSON.parse(localStorage.getItem("items"))
  );
  const ref = useRef(null);
  const submit = (e) => {
    e.preventDefault();
    if (id === 0) {
      let item = {
        id: items.length == 0 ? 1 : items.length + 1,
        title: title,
      };
      console.log(item);
      setItems([item, ...items]);
    } else if (id > 0) {
      setItems(
        items.map((currentItem) =>
          id == currentItem.id ? { ...currentItem, title: title } : currentItem
        )
      );
      setId(0);
    }
    setTitle("");
  };
  const onDelete = (item) => {
    setItems(items.filter((value) => item.id != value.id));
  };
  const onEdit = (item) => {
    setTitle(item.title);
    setId(item.id);
  };
  useEffect(() => {
    ref.current.select();
    localStorage.setItem("items", JSON.stringify(items));
  }, [items, id]);
  return (
    <div className="App">
      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Item Name"
          ref={ref}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">{id == 0 ? "Add" : "Edit"}</button>
      </form>
      {items.length > 0 ? (
        <ol>
          {items.map((item) => (
            <li>
              <div className="itemTitle">{item.title} </div>
              <button onClick={() => onEdit(item)}>Edit</button>
              <button onClick={() => onDelete(item)}>Delete</button>
            </li>
          ))}
        </ol>
      ) : (
        "No item found"
      )}
    </div>
  );
}

export default AppSimple;
