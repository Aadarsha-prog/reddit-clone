import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import Stepper from "./stepper";
import Typography from "@/components/ui/typogrpahy";
import { Button } from "@/components/ui/button";
import FormFooter from "./footer";
import { steps } from "../_utils";

function FormPageContent() {
  const [step, setStep] = React.useState(0);
  const C = steps[step].component;

  return (
    <Card className="max-w-173.75 w-full mx-auto rounded-[12px] p-16 pb-6 h-full">
      <CardHeader className="p-0 flex flex-col gap-20 w-full">
        <Stepper currStep={step} />
        <Typography variant="h4Bold">{steps[step].title}</Typography>
      </CardHeader>
      <CardContent className="p-0">
        <C />
        <Button
          onClick={() => setStep((prev) => prev - 1)}
          className="mt-6 w-full"
        >
          Back
        </Button>
        <Button
          onClick={() => setStep((prev) => prev + 1)}
          className="mt-6 w-full"
        >
          Next
        </Button>
      </CardContent>
      <FormFooter />
    </Card>
  );
}

export default FormPageContent;
