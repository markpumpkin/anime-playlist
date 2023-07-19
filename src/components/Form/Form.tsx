import { FormEvent } from "react";
import "./Form.css";

export type FormProps = {
    children: React.ReactNode;
    editAbled?: boolean;
    handleSubmit?: (e: FormEvent) => void;
    handleCancel?: () => void;
};
function Form(props: FormProps) {
    const { children, editAbled = false, handleSubmit, handleCancel } = props;

    return (
        <form
            className={`admin-form ${!editAbled ? "disabled" : ""}`}
            action=""
            onSubmit={handleSubmit}
        >
            {children}
            <div className="form-group _actions">
                <button className="btn-action btn-submit">Submit</button>
                <button className="btn-action btn-close" onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default Form;
