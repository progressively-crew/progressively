import { Form } from "@remix-run/react";
import { TextInput } from "~/components/Fields/TextInput";
import { Button } from "~/components/Buttons/Button";

export const CheckoutForm = () => {
  return (
    <Form method="post" className="flex flex-row gap-4 items-end">
      <input type="hidden" name="_type" value="start-payment" />

      <TextInput
        label="Credit count"
        type="number"
        name={"count"}
        defaultValue="10"
        hiddenLabel
      />

      <Button type="submit">Buy</Button>
    </Form>
  );
};
