import { Form } from "@remix-run/react";
import { TextInput } from "~/components/Fields/TextInput";
import { Button } from "~/components/Buttons/Button";

export const CheckoutForm = () => {
  return (
    <Form method="post">
      <input type="hidden" name="_type" value="start-payment" />
      <TextInput
        label="Number of credits to buy"
        type="number"
        name={"count"}
      />
      <Button type="submit">Go to payment</Button>
    </Form>
  );
};
