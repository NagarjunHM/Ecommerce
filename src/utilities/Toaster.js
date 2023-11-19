import { Message, toaster } from "rsuite";

export function CustomToaster(message, type) {
  const msg = (
    <Message showIcon type={type} closable>
      {message}
    </Message>
  );
  toaster.push(msg, { placement: "topEnd", duration: 3000 });
}
