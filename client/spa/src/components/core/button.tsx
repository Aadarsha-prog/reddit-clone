import "../../styles/core/button.css";

function Button(props: { children?: React.ReactNode; onClick?: () => void }) {
  return (
    <button className="btn" onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
