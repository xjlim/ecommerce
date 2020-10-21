export default function Counter({ count, setCount }) {
  return (
    <div className="flex my-4">
      <button
        className="bg-black text-white p-1 h-10 w-10"
        onClick={() => setCount(count - 1)}
      >
        -
      </button>
      <input
        className="p-1 mx-2 h-10 w-12 border-solid border-2 border-gray-900 border-opacity-50"
        onChange={(evt) => setCount(Number(evt.target.value))}
        value={count}
      ></input>
      <button
        className="bg-black text-white p-1 h-10 w-10"
        onClick={() => setCount(count + 1)}
      >
        +
      </button>
    </div>
  );
}
