import { Form } from "@remix-run/react";
import { TextInput } from "~/components/Fields/TextInput";
import { Button } from "~/components/Buttons/Button";
import { FormGroup } from "~/components/Fields/FormGroup";

export const CheckoutForm = () => {
  return (
    <Form method="post">
      <input type="hidden" name="_type" value="start-payment" />

      <FormGroup>
        <TextInput
          label="Number of credits to buy"
          type="number"
          name={"count"}
          defaultValue="1"
        />
        <div>
          <Button type="submit">Go to payment</Button>
        </div>
      </FormGroup>
    </Form>
  );
};
