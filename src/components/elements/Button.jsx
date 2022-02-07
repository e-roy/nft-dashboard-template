function Button(props) {
  return (
    <button className="" {...props}>
      {props.children}
    </button>
  );
}

export default Button;
