const Checkbox = ({ title, state, onChange}) => {
    return (
        <div>
            <input type="checkbox"
            onChange={onChange}
             checked={state}></input>
            <label>{title}</label>
          </div>
    );
}
export default Checkbox;